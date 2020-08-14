import { LightningElement, api, wire, track } from 'lwc';
import  call  from "@salesforce/apex/weatherLWC.call";
import pop  from "@salesforce/apex/weatherLWC.pop";


export default class weatherLWC extends LightningElement {
    @api APIKey;
    @api timeFrames;
    @api minutelyData;
    @api hourlyData;
    @api dailyData;
    
    @wire(pop) locations;
    selectedLoc;

    handleSelect(id) {
        if (selectedLoc != id) {
            let element;
            element = document.getElementById(selectedLoc);
            element.className = element.className.replace("slds-is-selected", "");
            element.getAttribute("aria-selected", false);
            element.getAttribute("aria-checked", false);
            
            selectedLoc = id;
            element = document.getElementById(id);
            element.className = element.className + " slds-is-selected";
            element.setAttribute("aria-selected", true);
            element.setAttribute("aria-checked", true);
        }
    }

}
