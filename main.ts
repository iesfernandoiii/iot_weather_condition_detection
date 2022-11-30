input.onButtonPressed(Button.A, function () {
    if (reloj_en_hora) {
        RTC_DS1307.setTime(RTC_DS1307.TimeType.MINUTE, RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE) + 1)
    }
})
input.onButtonPressed(Button.B, function () {
    if (reloj_en_hora) {
        RTC_DS1307.setTime(RTC_DS1307.TimeType.MINUTE, RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE) - 1)
    }
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
let reloj_en_hora = false
reloj_en_hora = false
if (!(reloj_en_hora)) {
    reloj_en_hora = true
    RTC_DS1307.DateTime(
    2022,
    11,
    30,
    19,
    15,
    0
    )
    basic.showString("" + RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR) + ":" + RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE))
}
OLED.init(128, 64)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("LBWifi", "LosBanyos")
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
