import { ContactModel } from "./contact-model";

export interface KeyValuePairModel
{
    id: string | null;
    name: string | null;
}

export interface VehicleModel {
    id: string | null;
    make: KeyValuePairModel | null;
    model: KeyValuePairModel | null;
    isRegistered: boolean | null;
    features: KeyValuePairModel[] | null; 
    contact: ContactModel | null;
}
