public with sharing class weatherLWC {
    @AuraEnabled(cacheable=true)
    public static string call(string lat, string lon, string key) {
        string payload = 'lat=' + lat +
                         '&lon=' + lon + 
                         '&appid=' + key;
        String apiCall = 'http://api.openweathermap.org/data/2.5/onecall?' + payload;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setTimeout(60000);
        request.setEndpoint(apiCall);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        String JSON = response.getBody();
        JSON = JSON.replace('1h','h');
        return JSON;
    }

    @AuraEnabled(cacheable=true)
    public static list<weatherLocation__c> pop() {
        list<weatherLocation__c> locations = [SELECT Id, Name, latitude__c, longitude__c FROM weatherLocation__c];
        return locations;

        /*        list<map<string,string>> parsedLocations = new list<map<string,string>>();

        for (weatherLocation__c wl : locations) {
            map<string,string> cur = new map<string,string>();
            cur.put('Id', wl.Id);
            cur.put('Name', wl.Name);
            cur.put('lat', wl.latitude__c);
            cur.put('lon',wl.longitude__c);
            parsedLocations.add(cur);
            system.debug(cur);
        }
        return parsedLocations;*/
    }
}