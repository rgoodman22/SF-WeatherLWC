public class OneCallQuery {
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
    public static wJSON2Apex parse(string JSON) {
        return wJSON2Apex.parse(JSON);
    }
}