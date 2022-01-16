import { payloadValidation as importProcessValidator } from './importProcess';
import { payloadValidation as exportTrackingValidator } from './exportTracking';

export const validator = {
    importProcess: importProcessValidator,
    exportTracking: exportTrackingValidator
};
