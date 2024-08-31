#include <WiFi.h>
#include <HTTPClient.h>

#define DEBUG_MODE false

const char* ssid = "abcd";  
const char* password = "1234";  

const int switch1Pin = 14;  
const int switch2Pin = 27;
const int switch3Pin = 33;
const int led = 2;

const char* serverName = "http://<your-server-ip>/value/";

void setup() {
  pinMode(switch1Pin, INPUT_PULLUP);  
  pinMode(switch2Pin, INPUT_PULLUP);
  pinMode(switch3Pin, INPUT_PULLUP);

  pinMode(led, OUTPUT);
  
  Serial.begin(115200);

  connectToWiFi(0);

  
}

void loop() {
  bool switch1State = digitalRead(switch1Pin) == LOW;  // Change to HIGH if using a different wiring
  bool switch2State = digitalRead(switch2Pin) == LOW;
  bool switch3State = digitalRead(switch3Pin) == LOW;

  int isAnySwitchOn = switch1State || switch2State || switch3State ? 0 : 1; // if any switch on -> dryer is off
  // or all 3 switches must be off -> dryer is on

  if(isAnySwitchOn == 1){
    digitalWrite(led, HIGH); 
  }else{
    digitalWrite(led, LOW);
  }

  String serverPath = serverName + String(isAnySwitchOn);

  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    
    http.begin(serverPath);
    int httpResponseCode = http.POST("");  // Sending a POST request with an empty body

#if DEBUG_MODE
    if (httpResponseCode > 0) { 
      String response = http.getString();  // Get the response to the request
      Serial.println(httpResponseCode);  // Print return code
      Serial.println(response);  
    }
    else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }
#endif

    http.end();  // Free resources
  }
  else {
    connectToWiFi(10); // 10 seconds
  }

  delay(1000);  // Delay to avoid spamming the server too frequently
}

void connectToWiFi(int timeout){ // timeout in seconds
  unsigned int startTime = millis();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    if(millis() >= startTime + (timeout*1000)) break;
    digitalWrite(led, HIGH);
    delay(100);                 
    digitalWrite(led, LOW); 
    delay(100);   
  }
}
