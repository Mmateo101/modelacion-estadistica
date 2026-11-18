# Sintetiza cada línea del guion con la voz de Windows (solo como guía de tiempos; el video final lleva las voces del equipo).
param([string]$Json, [string]$Out, [int]$Rate = -1)
Add-Type -AssemblyName System.Speech
$lineas = Get-Content -Raw -Encoding UTF8 $Json | ConvertFrom-Json
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voz = $s.GetInstalledVoices() | Where-Object { $_.VoiceInfo.Culture.Name -like "es-*" } | Select-Object -First 1
if ($null -eq $voz) { Write-Error "No hay una voz en español instalada en Windows."; exit 1 }
$s.SelectVoice($voz.VoiceInfo.Name)
$s.Rate = $Rate
$i = 0
foreach ($l in $lineas) {
  $f = Join-Path $Out ("{0:D2}.wav" -f $i)
  $s.SetOutputToWaveFile($f)
  $s.Speak($l.x)
  $i++
}
$s.SetOutputToNull()
$s.Dispose()
