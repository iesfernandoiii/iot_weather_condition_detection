OLED.init(128, 64)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("LBWifi", "LosBanyos")
basic.forever(function () {
    if (ESP8266_IoT.wifiState(true)) {
        ESP8266_IoT.connectThingSpeak()
        if (ESP8266_IoT.thingSpeakState(true)) {
            ESP8266_IoT.setData(
            "F0GCA2MBNTD7YHQ3",
            0
            )
        }
    }
})
