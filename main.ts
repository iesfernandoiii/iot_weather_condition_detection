input.onButtonPressed(Button.A, function () {
    RTC_DS1307.setTime(RTC_DS1307.TimeType.MINUTE, RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE) + 1)
})
input.onButtonPressed(Button.B, function () {
    RTC_DS1307.setTime(RTC_DS1307.TimeType.MINUTE, RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE) - 1)
})
function mostrar_datos_display () {
    OLED.clear()
    OLED.writeString("Luz:")
    OLED.writeNum(Environment.ReadLightIntensity(AnalogPin.P1))
    OLED.newLine()
    OLED.writeString("Temperatura (Cº):")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
    OLED.newLine()
    OLED.writeString("Humedad:")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_humidity))
}
basic.showString("Poniendo en hora")
RTC_DS1307.DateTime(
2022,
11,
30,
19,
15,
0
)
basic.showString("Hora fijada")
basic.showString("" + RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR) + ":" + RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE))
basic.pause(500)
basic.showString("Iniciando OLED")
OLED.init(128, 64)
OLED.clear()
OLED.drawLoading(25)
basic.showString("OLED iniciado")
basic.pause(200)
basic.showString("Iniciando Wifi")
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("LBWifi", "LosBanyos")
basic.pause(500)
if (ESP8266_IoT.wifiState(true)) {
    basic.showString("Wifi conectado")
    OLED.clear()
    OLED.drawLoading(50)
} else {
    basic.showString("Wifi NO")
}
basic.pause(500)
basic.forever(function () {
    basic.showString("" + RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR) + ":" + RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE))
    mostrar_datos_display()
    if (ESP8266_IoT.wifiState(true)) {
        ESP8266_IoT.connectThingSpeak()
        if (ESP8266_IoT.thingSpeakState(true)) {
            ESP8266_IoT.setData(
            "F0GCA2MBNTD7YHQ3",
            Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
            Environment.octopus_BME280(Environment.BME280_state.BME280_humidity),
            Environment.ReadLightIntensity(AnalogPin.P1)
            )
        }
    }
    basic.pause(60000)
})
