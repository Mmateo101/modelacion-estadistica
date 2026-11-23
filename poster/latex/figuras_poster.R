# Gráficas del póster (vectoriales, en PDF, con la misma letra del póster: Source Sans 3).
# Todas salen de la base preparada en la Etapa 2 y reproducen las cifras del reporte final.
# Uso: Rscript figuras_poster.R   (desde la carpeta Poster/latex)
suppressPackageStartupMessages({ library(ggplot2); library(dplyr); library(tidyr) })

datos = read.csv("../../Datos processed/DatosEquipo7_Etapa2.csv")
alfa = 0.04; z = qnorm(1 - alfa / 2)
niveles = c("Bajo (0-1)", "Medio (2)", "Alto (3-4)")
datos$acceso_hogar = factor(datos$acceso_hogar, levels = niveles)
datos$acceso_esc3 = cut(datos$ind_escuela, breaks = c(-1, 1, 2, 4), labels = niveles)
datos$escolaridad = factor(datos$escolaridad, levels = c("Primaria o menos", "Secundaria", "Media superior", "Superior"))
lect = subset(datos, lee == 1)

# ---------- estilo
F = "Source Sans 3"
# Rscript figuras_poster.R 2  → paleta del póster 2 (azul Tec, fondo blanco) en figs2/
modo = ifelse(length(commandArgs(TRUE)) > 0, commandArgs(TRUE)[1], "1")
if (modo == "2") {
  dir_f = "figs2"; fondo = "#FFFFFF"; tinta = "#1B2A41"; gris = "#5F6B7A"; reja = "#E3E8EF"
  c_hogar = "#E8912D"; c_esc = "#4FA3D9"; suave = "#E6EEF8"; clarito = "#EEF3FA"; fuerte = "#154E99"
  c_niv = c("Bajo (0-1)" = "#B9CFEC", "Medio (2)" = "#5D8FD3", "Alto (3-4)" = "#154E99")
} else {
  dir_f = "figs"; fondo = "#FBF8F2"; tinta = "#1D2440"; gris = "#6B6F80"; reja = "#E6E2D8"
  c_hogar = "#C8553D"; c_esc = "#2E6FA7"; suave = "#ECE8F4"; clarito = "#F4F1FA"; fuerte = "#3C3570"
  c_niv = c("Bajo (0-1)" = "#C9C6DD", "Medio (2)" = "#8C86B8", "Alto (3-4)" = "#3C3570")
}
dir.create(dir_f, showWarnings = FALSE)
pct = function(x) paste0(format(round(100 * x, 1), nsmall = 1), "%")
tema = function(base = 22) theme_minimal(base_size = base, base_family = F) + theme(
  text = element_text(colour = tinta), axis.text = element_text(colour = gris, size = rel(0.85)),
  axis.title = element_text(colour = gris, size = rel(0.85)), panel.grid.minor = element_blank(),
  panel.grid.major = element_line(colour = reja, linewidth = 0.5), plot.margin = margin(8, 14, 8, 8), plot.background = element_rect(fill = fondo, colour = NA),
  legend.position = "none", strip.text = element_text(face = "bold", size = rel(0.95), colour = tinta, hjust = 0, margin = margin(0, 0, 8, 0)))
guarda = function(p, nombre, w, h) ggsave(file.path(dir_f, paste0(nombre, ".pdf")), p, width = w, height = h, units = "cm", device = cairo_pdf, bg = fondo)
ic = function(x) { x = x[!is.na(x)]; p = mean(x); n = length(x); e = z * sqrt(p * (1 - p) / n); c(p = p, li = p - e, ls = p + e, n = n) }

# ---------- 1 · % de lectores por número de estímulos (hogar y escuela)
f1 = bind_rows(
  datos %>% filter(!is.na(ind_hogar)) %>% group_by(k = ind_hogar) %>% summarise(p = mean(lee)) %>% mutate(g = "Hogar"),
  datos %>% filter(!is.na(ind_escuela)) %>% group_by(k = ind_escuela) %>% summarise(p = mean(lee)) %>% mutate(g = "Escuela"))
p1 = ggplot(f1, aes(k, p, colour = g)) +
  geom_line(linewidth = 2.2) + geom_point(size = 6, shape = 21, fill = "white", stroke = 2.2) +
  geom_text(data = filter(f1, k %in% c(0, 4)), aes(label = pct(p), vjust = ifelse((g == "Hogar") == (k == 4), -1.1, 2.0)),
            family = F, fontface = "bold", size = 7.5, show.legend = FALSE) +
  annotate("text", x = 4.15, y = 0.665, label = "Hogar", hjust = 0, family = F, fontface = "bold", size = 8.5, colour = c_hogar) +
  annotate("text", x = 4.15, y = 0.504, label = "Escuela", hjust = 0, family = F, fontface = "bold", size = 8.5, colour = c_esc) +
  scale_colour_manual(values = c(Hogar = c_hogar, Escuela = c_esc)) +
  scale_y_continuous(labels = function(x) paste0(100 * x, "%"), limits = c(0.15, 0.75), breaks = seq(0.2, 0.7, 0.1)) +
  scale_x_continuous(breaks = 0:4, limits = c(-0.2, 5.0)) +
  labs(x = "Número de estímulos recibidos en la infancia (0 a 4)", y = "Leyó al menos un libro") + tema()
guarda(p1, "f1_estimulos", 26, 12.5)

# ---------- 2 · IC 96% de la proporción de lectores por nivel de acceso
f2 = bind_rows(
  as.data.frame(t(sapply(niveles, function(k) ic(datos$lee[datos$acceso_hogar == k & !is.na(datos$acceso_hogar)])))) %>% mutate(niv = niveles, g = "Acceso en el hogar"),
  as.data.frame(t(sapply(niveles, function(k) ic(datos$lee[datos$acceso_esc3 == k & !is.na(datos$acceso_esc3)])))) %>% mutate(niv = niveles, g = "Acceso en la escuela"))
f2$niv = factor(f2$niv, levels = rev(niveles)); f2$g = factor(f2$g, levels = c("Acceso en el hogar", "Acceso en la escuela"))
write.csv(f2, file.path(dir_f, "f2_valores.csv"), row.names = FALSE)
p2 = ggplot(f2, aes(p, niv)) +
  geom_errorbar(aes(xmin = li, xmax = ls, colour = niv), width = 0.32, orientation = "y", linewidth = 2) +
  geom_point(aes(fill = niv), shape = 21, size = 6.5, colour = tinta, stroke = 1.2) +
  geom_text(aes(x = ls + 0.012, label = sprintf("%s  [%s, %s]", pct(p), format(round(100 * li, 1), nsmall = 1), format(round(100 * ls, 1), nsmall = 1))),
            hjust = 0, family = F, size = 6.6, colour = tinta) +
  facet_wrap(~g, ncol = 1) +
  scale_colour_manual(values = c_niv) + scale_fill_manual(values = c_niv) +
  scale_x_continuous(labels = function(x) paste0(100 * x, "%"), limits = c(0.24, 0.86), breaks = seq(0.3, 0.6, 0.1)) +
  scale_y_discrete(labels = c("Bajo (0-1)" = "Bajo (0–1)", "Medio (2)" = "Medio (2)", "Alto (3-4)" = "Alto (3–4)")) +
  labs(x = "Proporción de lectores e IC al 96%", y = NULL) + tema() + theme(panel.grid.major.y = element_blank(), panel.spacing = unit(14, "pt"))
guarda(p2, "f2_ic_niveles", 26, 14.5)

# ---------- 3 · % de lectores por escolaridad y acceso en el hogar (mismo nivel escolar)
f3 = datos %>% filter(!is.na(escolaridad), !is.na(acceso_hogar)) %>% group_by(escolaridad, acceso_hogar) %>% summarise(p = mean(lee), .groups = "drop")
seg = f3 %>% select(escolaridad, acceso_hogar, p) %>% pivot_wider(names_from = acceso_hogar, values_from = p)
p3 = ggplot() +
  geom_segment(data = seg, aes(x = `Bajo (0-1)`, xend = `Alto (3-4)`, y = escolaridad, yend = escolaridad), linewidth = 5, colour = suave, lineend = "round") +
  geom_point(data = f3, aes(p, escolaridad, fill = acceso_hogar), shape = 21, size = 8, colour = tinta, stroke = 1.2) +
  geom_text(data = seg, aes(x = `Alto (3-4)` + 0.025, y = escolaridad, label = sprintf("+%.0f pts", 100 * (`Alto (3-4)` - `Bajo (0-1)`))),
            hjust = 0, family = F, fontface = "bold", size = 7, colour = tinta) +
  geom_text(data = filter(f3, acceso_hogar != "Medio (2)"), aes(p, escolaridad, label = round(100 * p)), vjust = -1.25, family = F, size = 6, colour = gris) +
  scale_fill_manual(values = c_niv, labels = c("Bajo (0–1)", "Medio (2)", "Alto (3–4)"), name = "Acceso en el hogar") +
  scale_x_continuous(labels = function(x) paste0(100 * x, "%"), limits = c(0.1, 0.9), breaks = seq(0.2, 0.8, 0.2)) +
  labs(x = "Leyó al menos un libro", y = NULL) + tema() +
  theme(legend.position = "top", legend.justification = "left", legend.title = element_text(size = 20, colour = gris),
        legend.text = element_text(size = 20), panel.grid.major.y = element_blank(), legend.margin = margin(0, 0, 0, 0))
guarda(p3, "f3_escolaridad", 26, 12.5)

# ---------- 4 · Tabla de contingencia de los índices (porcentaje por renglón) — prueba ji-cuadrada
tab = table(datos$ind_hogar, datos$ind_escuela)
chi = suppressWarnings(chisq.test(tab))
f4 = as.data.frame(prop.table(tab, 1)); names(f4) = c("hogar", "escuela", "p")
p4 = ggplot(f4, aes(escuela, hogar, fill = p)) +
  geom_tile(colour = fondo, linewidth = 2.5) +
  geom_text(aes(label = round(100 * p), colour = p > 0.4), family = F, fontface = "bold", size = 7.5) +
  scale_fill_gradient(low = clarito, high = fuerte, limits = c(0, 0.8)) +
  scale_colour_manual(values = c(`FALSE` = tinta, `TRUE` = "white")) +
  coord_equal() + labs(x = "Estímulos en la escuela", y = "Estímulos en el hogar") +
  tema() + theme(panel.grid = element_blank(), axis.text = element_text(size = 22, colour = tinta))
guarda(p4, "f4_contingencia", 14, 14)

# ---------- 5 · Estímulos solo en casa vs solo en la escuela
solo_casa = subset(datos, ind_hogar > 0 & ind_escuela == 0); solo_esc = subset(datos, ind_hogar == 0 & ind_escuela > 0)
f5 = data.frame(g = c("Solo en la escuela", "Solo en el hogar"), rbind(ic(solo_esc$lee), ic(solo_casa$lee)))
f5$g = factor(f5$g, levels = f5$g)
p5 = ggplot(f5, aes(p, g)) +
  geom_col(aes(fill = g), width = 0.62) +
  geom_errorbar(aes(xmin = li, xmax = ls), width = 0.22, orientation = "y", linewidth = 1.6, colour = tinta) +
  geom_text(aes(x = ls + 0.02, label = sprintf("%s  (n = %s)", pct(p), format(n, big.mark = ",", trim = TRUE))), hjust = 0, family = F, fontface = "bold", size = 7, colour = tinta) +
  scale_fill_manual(values = c("Solo en la escuela" = c_esc, "Solo en el hogar" = c_hogar)) +
  scale_x_continuous(labels = function(x) paste0(100 * x, "%"), limits = c(0, 0.78), breaks = seq(0, 0.5, 0.25), expand = c(0, 0)) +
  labs(x = "Leyó al menos un libro (IC al 96%)", y = NULL) + tema() + theme(panel.grid.major.y = element_blank(), axis.text.y = element_text(size = 22, colour = tinta))
guarda(p5, "f5_solo", 26, 7.5)

# ---------- 6 · Cuántos libros leen los lectores, según el acceso en el hogar
cortes = c(0, 1, 2, 4, 9, Inf); etq = c("1", "2", "3–4", "5–9", "10 o más")
f6 = lect %>% filter(!is.na(acceso_hogar)) %>% mutate(c = cut(libros, cortes, labels = etq)) %>%
  count(acceso_hogar, c) %>% group_by(acceso_hogar) %>% mutate(p = n / sum(n)) %>% ungroup()
med = lect %>% filter(!is.na(acceso_hogar)) %>% group_by(acceso_hogar) %>% summarise(m = mean(libros), md = median(libros), n = n())
write.csv(med, file.path(dir_f, "f6_medias.csv"), row.names = FALSE)
f6$c = factor(f6$c, levels = rev(etq))
pal6 = setNames(c("#EFEAE0", "#D9CFBD", "#B7A88E", "#8A7A60", "#4E4234"), etq)
p6 = ggplot(f6, aes(p, acceso_hogar, fill = c)) +
  geom_col(width = 0.66, colour = "white", linewidth = 0.8) +
  geom_text(aes(label = ifelse(p > 0.06, round(100 * p), ""), colour = c %in% c("5–9", "10 o más"), group = c), position = position_stack(vjust = 0.5), family = F, size = 6.4, fontface = "bold") +
  geom_text(data = med, aes(x = 1.02, y = acceso_hogar, label = sprintf("media %.2f · mediana %d", m, as.integer(md))), inherit.aes = FALSE, hjust = 0, family = F, size = 6.4, colour = tinta) +
  scale_fill_manual(values = pal6, breaks = etq, name = "Libros al año") +
  scale_colour_manual(values = c(`FALSE` = tinta, `TRUE` = "white"), guide = "none") +
  scale_x_continuous(labels = function(x) paste0(100 * x, "%"), breaks = seq(0, 1, 0.25), limits = c(0, 1.62), expand = c(0, 0)) +
  scale_y_discrete(labels = c("Bajo (0-1)" = "Bajo (0–1)", "Medio (2)" = "Medio (2)", "Alto (3-4)" = "Alto (3–4)")) +
  labs(x = "Lectores según el número de libros leídos", y = "Acceso en el hogar") + tema() +
  theme(legend.position = "top", legend.justification = "left", legend.title = element_text(size = 20, colour = gris), legend.text = element_text(size = 20),
        panel.grid.major.y = element_blank(), legend.margin = margin(0, 0, 0, 0))
guarda(p6, "f6_libros", 26, 10.5)

# ---------- 7 · Brecha por año (descriptivo, estabilidad 2019–2024)
f7 = datos %>% filter(!is.na(acceso_hogar)) %>% group_by(anio, acceso_hogar) %>% summarise(p = mean(lee), .groups = "drop")
p7 = ggplot(f7, aes(anio, p, colour = acceso_hogar)) + geom_line(linewidth = 2) + geom_point(size = 4.5) +
  geom_text(data = filter(f7, anio == 2024), aes(label = c("Bajo", "Medio", "Alto")[as.integer(acceso_hogar)]), hjust = -0.25, family = F, fontface = "bold", size = 7) +
  scale_x_continuous(breaks = 2019:2024, limits = c(2019, 2024.8)) +
  scale_colour_manual(values = c_niv) +
  scale_y_continuous(labels = function(x) paste0(100 * x, "%"), limits = c(0.2, 0.7)) +
  labs(x = NULL, y = "Leyó al menos un libro") + tema(22)
guarda(p7, "f7_anios", 26, 10)

# ---------- 8 · Estímulos en la escuela según los estímulos en el hogar (barras apiladas al 100%)
f8 = as.data.frame(prop.table(tab, 1)); names(f8) = c("hogar", "escuela", "p")
nh = as.vector(rowSums(tab)); f8$hogar = factor(f8$hogar, levels = 0:4, labels = sprintf("%d  (n = %s)", 0:4, format(nh, big.mark = ",", trim = TRUE)))
f8$escuela = factor(f8$escuela, levels = 4:0)
pal8 = setNames(colorRampPalette(c(clarito, c_niv[["Medio (2)"]], fuerte))(5), 0:4)
p8 = ggplot(f8, aes(p, hogar, fill = escuela)) +
  geom_col(width = 0.7, colour = fondo, linewidth = 0.8) +
  geom_text(aes(label = ifelse(p > 0.07, round(100 * p), ""), colour = as.integer(as.character(escuela)) >= 3, group = escuela), position = position_stack(vjust = 0.5), family = F, fontface = "bold", size = 6.6) +
  scale_fill_manual(values = pal8, breaks = 0:4, name = "Estímulos en la escuela") +
  scale_colour_manual(values = c(`FALSE` = tinta, `TRUE` = "white"), guide = "none") +
  scale_x_continuous(labels = function(x) paste0(100 * x, "%"), expand = c(0, 0.012)) +
  labs(x = "Porcentaje por renglón", y = "Estímulos en el hogar") + tema() +
  theme(legend.position = "top", legend.justification = "left", legend.title = element_text(size = 20, colour = gris), legend.text = element_text(size = 20),
        panel.grid.major.y = element_blank(), legend.margin = margin(0, 0, 0, 0))
guarda(p8, "f8_apiladas", 26, 12)

# cifras para revisar contra el reporte
cat(sprintf("chi2 = %.2f, gl = %d\n", chi$statistic, chi$parameter))
print(f2[, c("g", "niv", "p", "li", "ls", "n")]); print(f5); print(med)
pz = prop.test(c(sum(solo_casa$lee), sum(solo_esc$lee)), c(nrow(solo_casa), nrow(solo_esc)), correct = FALSE, conf.level = 0.96)
cat("solo casa - solo esc IC:", round(pz$conf.int, 4), "\n")
lib_alto = lect$libros[lect$acceso_hogar == "Alto (3-4)"]; lib_bajo = lect$libros[lect$acceso_hogar == "Bajo (0-1)"]
tt = t.test(lib_alto, lib_bajo, alternative = "greater"); cat("t =", round(tt$statistic, 2), "gl =", round(tt$parameter), "\n")
