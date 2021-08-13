import { ContactModel } from "./contact-model";

export interface BasicVehicleModel {
    id: string | null;
    makeId: string | null;
    modelId: string | null;
    isRegistered: boolean ;
    contact: ContactModel | null;
    features: (string | null)[];
}


