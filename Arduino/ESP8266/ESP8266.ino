#include <ArduinoWiFiServer.h>
#include <BearSSLHelpers.h>
#include <CertStoreBearSSL.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiAP.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiGratuitous.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WiFiScan.h>
#include <ESP8266WiFiSTA.h>
#include <ESP8266WiFiType.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <WiFiClientSecureBearSSL.h>
#include <WiFiServer.h>
#include <WiFiServerSecure.h>
#include <WiFiServerSecureBearSSL.h>
#include <WiFiUdp.h>
#include <SoftwareSerial.h>

#include "config.h"

const char *SSID = WIFI_SSID;
const char *Password = WIFI_PASSWORD;
const char *ServerHost = SERVER_HOST;
const uint16_t ServerPort = SERVER_PORT;
char byteData;
SoftwareSerial UART(13, 15); //RX(D7) TX(D8)
WiFiClient client;


void setup() {
  Serial.begin(BAUD_RATE);
  UART.begin(BAUD_RATE);

  pinMode(LED_BUILTIN, OUTPUT);
  scanWifi();
  WiFi.begin(SSID, Password);
  int status;

  while ((status = WiFi.status()) != WL_CONNECTED) {
    Serial.printf("Try Connecting to %s...\n", SSID);
    Serial.printf("Connection Status: ");
    switch (status) {
      case WL_IDLE_STATUS:
        Serial.printf("IDLE");
        break;
      case WL_NO_SSID_AVAIL:
        Serial.printf("NO SSID AVAILABLE");
        break;
      case WL_CONNECTED:
        Serial.printf("CONNECTED");
        break;
WL_CONNECT_FAILED:
        Serial.printf("CONNECT FAILED");
        break;
WL_DISCONNECTED:
        Serial.printf("DISCONNECTED");
        break;
      default:
        Serial.printf("UNKNOWN STATUS %d", status);
        break;
    }
    Serial.printf("\n");
    delay(1000);
  }
  Serial.printf("Wifi Connected!\n");
  Serial.printf("IP Address: %s\n", WiFi.localIP().toString().c_str());
  digitalWrite(LED_BUILTIN, LOW);
  initWiFiClient();
}

void scanWifi() {
  Serial.printf("Start Scan Wifi\n");
  int n = WiFi.scanNetworks();
  Serial.printf("Complete Scan Wifi\n");
  if (n == 0)
    Serial.printf("Network Not Found\n");
  else {
    Serial.printf("Found %d Network(s)\n", n);
    for (int c = 0; c < n; c++) {
      Serial.printf("%d: %s (%d) %c\n", c + 1, WiFi.SSID(c), WiFi.RSSI(c), WiFi.encryptionType(c) == ENC_TYPE_NONE ? ' ' : '*');
    }
  }
}

void initWiFiClient() {
  while (!client.connect(ServerHost, ServerPort)) {
    Serial.printf("Try connecting to %s\n", ServerHost);
  }
  Serial.printf("Success connect to %s\n", ServerHost);
  client.printf("c");
}

void loop() {
  while (UART.available() > 0) {
    byteData = UART.read();
    Serial.printf("%c", byteData);
    client.printf("%c", byteData);
  }
  if (!client.connected()) {
    Serial.printf("Disconnected\n");
    client.printf("d");
    initWiFiClient();
  }
  while (client.available() > 0) {
    byteData = client.read();
    Serial.printf("%c", byteData);
    UART.printf("%c", byteData);
  }
}
