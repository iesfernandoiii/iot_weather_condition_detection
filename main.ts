let enviar_a_nube = true
basic.showString("Hora")
RTC_DS1307.DateTime(
2022,
11,
30,
20,
6,
0
)
OLED.init(128, 64)
OLED.clear()
OLED.writeStringNewLine("OLED iniciado")
basic.pause(1000)
OLED.writeStringNewLine("" + RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR) + ":" + RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE))
basic.pause(1000)
OLED.writeStringNewLine("Iniciando Wifi")
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("LBWifi", "LosBanyos")
OLED.clear()
if (ESP8266_IoT.wifiState(true)) {
    OLED.writeStringNewLine("Wifi OK")
} else {
    OLED.writeStringNewLine("Wifi NO conectado")
}
basic.pause(1000)
basic.forever(function () {
    OLED.clear()
    OLED.writeStringNewLine("" + RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR) + ":" + RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE))
    if (ESP8266_IoT.wifiState(true)) {
        OLED.writeString("Luz:")
        OLED.writeNumNewLine(Environment.ReadLightIntensity(AnalogPin.P1))
        OLED.writeString("Temperatura (Cº):")
        OLED.writeNumNewLine(Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
        OLED.writeString("Humedad:")
        OLED.writeNumNewLine(Environment.octopus_BME280(Environment.BME280_state.BME280_humidity))
        if (enviar_a_nube) {
            ESP8266_IoT.connectThingSpeak()
            ESP8266_IoT.setData(
            "F0GCA2MBNTD7YHQ3",
            Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
            Environment.octopus_BME280(Environment.BME280_state.BME280_humidity),
            Environment.ReadLightIntensity(AnalogPin.P1)
            )
            ESP8266_IoT.uploadData()
        }
    } else {
        OLED.writeStringNewLine("No conectado a la Wifi")
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.sad), SoundExpressionPlayMode.UntilDone)
    }
    basic.pause(60000)
})
