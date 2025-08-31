import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneInput } from 'react-international-phone';
import useInscriptionStore from '@stores/studentRegistrationStore'
import 'react-international-phone/style.css';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};

const App = () => {
 const {formData, updateFormData, errors} = useInscriptionStore()
    const isValid = isPhoneValid(formData.telephone);

    return (<>
        <PhoneInput
            defaultCountry="cm"
            value={formData.telephone}
            onChange={(phone) => updateFormData("telephone", phone)}
            className="w-full"
            inputClassName="w-full border rounded px-3 py-2"
            inputStyle={{ width: '80%' }}
        />

        {!isValid && <div style={{ color: 'red' }}>Phone is not valid</div>}
    </>
          


    );

};

export default App;