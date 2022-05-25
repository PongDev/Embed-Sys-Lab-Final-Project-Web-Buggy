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

#include "config.h"

const char *SSID = WIFI_SSID;
const char *Password = WIFI_PASSWORD;

void setup() {
  Serial.begin(9600);
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

void loop() {
  //  Serial.printf("Connection Status: %d\n", WiFi.status());
  //  delay(2000);
}
