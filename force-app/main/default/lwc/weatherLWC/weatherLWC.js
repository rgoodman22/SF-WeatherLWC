import { LightningElement, api, wire, track } from 'lwc';
import  call  from "@salesforce/apex/weatherLWC.call";
import pop  from "@salesforce/apex/weatherLWC.pop";
import weatherIcon from "@salesforce/resourceUrl/weatherIcon";


export default class weatherLWC extends LightningElement {
    @api APIKey;
    @api timeFrames;
    @api minutelyData;
    @api hourlyData;
    @api dailyData;

    svgURL = `${weatherIcon}#snowy-3`;
    

    
    @track data;
    @track error;
    @track value = 'Search a location...';
    @track name;
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

    get options() {
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


    handleselect(event) {
        this.value = event.detail.value;
        this.isLocationSelected = true;
    }

    get getName() {
        if (this.data) {
            let length = this.data.length;
            for (let i = 0; i<length; i++) {
                let x = this.data[i];
                if (this.value === x.Id) {
                    return x.Name;
                }
            }
        }
    }



}
