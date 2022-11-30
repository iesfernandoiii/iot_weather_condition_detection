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
OLED.init(128, 64)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("LBWifi", "LosBanyos")
basic.forever(function () {
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
