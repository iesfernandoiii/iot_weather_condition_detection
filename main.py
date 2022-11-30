def on_button_pressed_a():
    if reloj_en_hora:
        RTC_DS1307.set_time(RTC_DS1307.TimeType.MINUTE,
            RTC_DS1307.get_time(RTC_DS1307.TimeType.MINUTE) + 1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    if reloj_en_hora:
        RTC_DS1307.set_time(RTC_DS1307.TimeType.MINUTE,
            RTC_DS1307.get_time(RTC_DS1307.TimeType.MINUTE) - 1)
input.on_button_pressed(Button.B, on_button_pressed_b)

def mostrar_datos_display():
    OLED.clear()
    OLED.write_string("Luz:")
    OLED.write_num(Environment.read_light_intensity(AnalogPin.P1))
    OLED.new_line()
    OLED.write_string("Temperatura (Cº):")
    OLED.write_num(Environment.octopus_BME280(Environment.BME280_state.BME280_TEMPERATURE_C))
    OLED.new_line()
    OLED.write_string("Humedad:")
    OLED.write_num(Environment.octopus_BME280(Environment.BME280_state.BME280_HUMIDITY))
reloj_en_hora = False
reloj_en_hora = False
if not (reloj_en_hora):
    reloj_en_hora = True
    RTC_DS1307.date_time(2022, 11, 30, 19, 15, 0)
    basic.show_string("" + str(RTC_DS1307.get_time(RTC_DS1307.TimeType.HOUR)) + ":" + str(RTC_DS1307.get_time(RTC_DS1307.TimeType.MINUTE)))
OLED.init(128, 64)
ESP8266_IoT.init_wifi(SerialPin.P8, SerialPin.P12, BaudRate.BAUD_RATE115200)
ESP8266_IoT.connect_wifi("LBWifi", "LosBanyos")

def on_forever():
    basic.show_string("" + str(RTC_DS1307.get_time(RTC_DS1307.TimeType.HOUR)) + ":" + str(RTC_DS1307.get_time(RTC_DS1307.TimeType.MINUTE)))
    mostrar_datos_display()
    if ESP8266_IoT.wifi_state(True):
        ESP8266_IoT.connect_thing_speak()
        if ESP8266_IoT.thing_speak_state(True):
            ESP8266_IoT.set_data("F0GCA2MBNTD7YHQ3",
                Environment.octopus_BME280(Environment.BME280_state.BME280_TEMPERATURE_C),
                Environment.octopus_BME280(Environment.BME280_state.BME280_HUMIDITY),
                Environment.read_light_intensity(AnalogPin.P1))
    basic.pause(60000)
basic.forever(on_forever)
