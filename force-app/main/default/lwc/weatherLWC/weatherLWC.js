import { LightningElement, api, wire, track } from 'lwc';
import  call  from "@salesforce/apex/weatherLWC.call";
import pop  from "@salesforce/apex/weatherLWC.pop";
import weatherIcon from "@salesforce/resourceUrl/weatherIcon";


export default class weatherLWC extends LightningElement {
    @api APIKey;
    @track data; //locations values
    @track error;
    lat = '0';
    lon = '0';
    @track locValue = 'Search a location...';
    isLocationSelected = false;
    
    @wire(pop) 
    popLocations ({error, data}) {
        if (data) {
            this.data = data;
            this.error = undefined;
        } else {
            this.error = error;
            this.data = undefined;
        }
    }
    
    
    @track wData; //weather values
    @track wError;
    @track svgURL = `${weatherIcon}#snowy-3`;
    @track timeValue = "Choose a setting...";

    @wire(call, {lat: '$lat', lon: '$lon', key: '$APIKey'})
        popWeather({error, data}) {
            if (data) {
                this.wData=JSON.parse(data);
                this.wError=undefined;
            } else {
                this.wData=undefined;
                this.wError=error;
            }
        }
    
   
    timeHandleSelect(event) {
        this.timeValue = event.detail.value;
    }
    locHandleSelect(event) {
        this.locValue = event.detail.value;
        this.isLocationSelected = true;
        
        let length = this.data.length;
        for (let i = 0; i<length; i++) {
            let x = this.data[i];
            if (this.locValue === x.Id) {
                this.lat = x.latitude__c;
                this.lon = x.longitude__c;
            }
        }
    }
    setPos() {
        if (this.data) {
            let length = this.data.length;
            for (let i = 0; i<length; i++) {
                let x=this.data[i];
                if (this.locValue === x.Id) {
                    return[x.latitude__c,x.longitude__c];
                }
            }
        }
    }
    setDTime(unix, offset) {
        let timestamp = unix;
        timestamp = new Date(timestamp*1000);
        let formatted = timestamp.toLocaleDateString("en-US") + " " + timestamp.toLocaleTimeString("en-US");
        return formatted;
    }
    setTime(unix, offset) {
        let timestamp = unix;
        timestamp = new Date(timestamp*1000);
        let formatted = timestamp.toLocaleTimeString("en-US");
        return formatted;
    }
    setDirection(deg) {
        deg = parseInt(deg);
        let dir = ['N','NE','E','SE','S','SW','W','NW','N'];
        let ind = Math.round(360/deg);
        return dir[ind];
    }

    get locOptions() {
        if (this.data) {
            let myOptions = [];
            let length = this.data.length;
            for (let i = 0; i < length; i++){
                let x = this.data[i];
                myOptions.push({label: x.Name, value: x.Id});

            }
            return myOptions;
        } else{
            return this.error;
        }  
    }
    get getName() {
        if (this.data) {
            let length = this.data.length;
            for (let i = 0; i<length; i++) {
                let x = this.data[i];
                if (this.locValue === x.Id) {
                    return x.Name;
                }
            }
        }
    }
    get timeOptions() {
        let myoptions = [
            {label: "Current", value: "Current"},
            {label: "Minutely", value: "Minutely"},
            {label: "Hourly", value: "Hourly"},
            {label: "Daily", value: "Daily"}
        ];
        return myoptions;
    }
    get getCurTime() {
        return this.setDTime(this.wData.current.dt, this.wData.timezone_offset);
    }
    get getCSunrise() {
        return this.setTime(this.wData.current.sunrise, this.wData.timezone_offset);
    }
    get getCSunset() {
        return this.setTime(this.wData.current.sunset, this.wData.timezone_offset);
    }
    get getCTemp() {
        return this.wData.current.temp + '°F';
    }
    get getCFeelsLike(){
        return this.wData.current.feels_like + '°F';
    }
    get getCDescription(){
        return this.wData.current.weather[0].description;
    }
    get getCHumidity(){
        return this.wData.current.humidity +'%';
    }
    get getCVisibility() {
        return this.wData.current.visibility + 'm';
    }
    get getCClouds() {
        return this.wData.current.clouds + '%';
    }
    get getCWSpeed() {
        return this.wData.current.wind_speed + 'MPH';
    }
    get getCWDeg() {
        return this.wData.current.wind_deg + '° ' + this.setDirection(this.wData.current.wind_deg);
    }

}
