import { LightningElement, api, wire, track } from 'lwc';
import  call  from "@salesforce/apex/weatherLWC.call";
import pop  from "@salesforce/apex/weatherLWC.pop";
import weatherIcon from "@salesforce/resourceUrl/weatherIcon";


export default class weatherLWC extends LightningElement {
    @api APIKey;

    svgURL = `${weatherIcon}#snowy-3`;
    

    @track lat = '0';
    @track lon = '0';
    @track data;
    @track error;
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

    

    @track timeValue = "Choose a setting...";

    get timeOptions() {
        let myoptions = [
            {label: "Current", value: "Current"},
            {label: "Minutely", value: "Minutely"},
            {label: "Hourly", value: "Hourly"},
            {label: "Daily", value: "Daily"}
        ];
        return myoptions;
    }

    timeHandleSelect(event) {
        this.timeValue = event.detail.value;
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


    locHandleSelect(event) {
        this.locValue = event.detail.value;
        this.isLocationSelected = true;
        setPos
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

    setPos() {
        if (this.data) {
            let length = this.data.length;
            for (let i = 0; i<length; i++) {
                let x=this.data[i];
                if (this.locValue === x.Id) {
                    this.lat = x.latitude__c;
                    this.lon = x.longitude__c;
                }
            }
        }
    }



}
