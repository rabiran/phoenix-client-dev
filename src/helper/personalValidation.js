import { RESPONSIBILITY, ENTITY_TYPE, DOMAIN_MAP, RANK } from '../config/config';
export const domainMap= new Map(JSON.parse(JSON.stringify(DOMAIN_MAP)));

export class BasicValidate {
    static stringNotEmpty(str) {
        return str !== '';
    }

    // Returns if the string consist of a number
    static isStringedNumber(stringedNumber) {
        return /^\d+$/.test(stringedNumber);
    }
}

export class PersonValidate extends BasicValidate {

    // Ensure the ID consist of numbers only and has length of 7
    static id(id) {
        return (id.length === 7) && PersonValidate.isStringedNumber(id);
    }

    // Ensure the name at least 2 letters
    static leastTwoLetters(str) {
        return /^([A-Za-z\u0590-\u05fe']{2,}\s?)+$/.test(str);
    }

    // Ensure the name at least 2 letters
    static maxNineDigit(str) {
        return /^\d{0,9}$/.test(str);
    }

    // Ensure the name at least 2 letters
    static minFiveDigit(str) {
        return /^\d{5,9}$/.test(str);
    }

    // Ensure the name is letters only
    static namePart(name) {
        return /^(([A-Za-z\u0590-\u05fe']*)+|([A-Za-z\u0590-\u05fe]+\s?)+)$/.test(name);
    }

    static email(mail) {
        return /.+@.+\..+/.test(mail) || !mail;
    }

    static mobilePhone(mobilePhone) {
        return /^\d{2,3}-?\d{7}$/.test(mobilePhone) || !PersonValidate.stringNotEmpty(mobilePhone);
    }

    static rank(rank) {
        return RANK.includes(rank);
    }
    /**
     * Check if phone like to: 02-123456/7, 02123456/7,
     *  *123, 1234/5  
     * @param phone Phone number
     */
    static phone(phone) {
        return /^\d{1,2}-?\d{6,7}$|^\*\d{3}$|^\d{4,5}$/.test(phone) || !PersonValidate.stringNotEmpty(phone);
    }

    static personalNumber(personalNumber) {
        return /^\d{6,9}$/.test(personalNumber);
    }

    static identityCard(identityCard) {

        // Validate correct input
        if (!identityCard.match(/^\d{5,9}$/g)) return false;

        // The number is too short - add leading 0000
        identityCard = identityCard.padStart(9, '0');

        // CHECK THE ID NUMBER
        const accumulator = identityCard.split('').reduce((count, currChar, currIndex) => {
            const num = Number(currChar) * ((currIndex % 2) + 1);
            return count += num > 9 ? num - 9 : num;
        }, 0);

        return (accumulator % 10 === 0);
    }

    static clearance(clearance) {
        return /^([0-9]|10)$/.test(clearance);
    }

    static responsibilityLocation(responsibilityLocation, responsibility) {
        return (responsibility !== RESPONSIBILITY[0]);
    }

    static isLegalUserString(uniqueID) {
        return !(uniqueID.startsWith('@') || uniqueID.endsWith('@')
            || uniqueID.split('@').length !== 2);
    }

    static domain(domain) {
        return ([...domainMap.keys()]).includes(domain);
    }

    static zipCode(zipCode) {
        return /^\d{7,}$/.test(zipCode)
    }
    static maxSeven(str) {
        return /^\d{0,7}$/.test(str);
    }

    static homeNumber(str) {
        return /^[\d'\\/]*$/.test(str);
    }
    // multifield validators returns false when the person is invalid (and thus the field is required!)

    static currentUnitMultiValidator(person) {
        return !!person.currentUnit || person.entityType !== ENTITY_TYPE[1];
    }

    static identityCardMultiValidator(person) {
        return !(!person.identityCard && person.entityType === ENTITY_TYPE[0]);
    }

    static personalNumberMultiValidator(person) {
        return !(!person.personalNumber && person.entityType === ENTITY_TYPE[1]);
    }

    static rankMultiFieldValidator(person) {
        return !((person.entityType === ENTITY_TYPE[1] && !person.rank)
            || (person.entityType === ENTITY_TYPE[0] && !!person.rank));
    }

    static responsibilityLocationMultiValidator(person) {
        return ( // there is responsibility(not "none") and responsibilityLocation
            person.responsibilityLocation && person.responsibility
            && person.responsibility !== RESPONSIBILITY[0]) ||
            // there is not responsibilityLocation and responsibility is "none" (or undefined) 
            (!person.responsibilityLocation && (!person.responsibility ||
                person.responsibility === RESPONSIBILITY[0]));
    }

    static domainUsersMultiValidator(person) {
        return (person.entityType !== ENTITY_TYPE[2]) || (person.domainUsers && person.domainUsers.length !== 0);
    }

    static lastNameMultiValidator(person) {
        return person.entityType === ENTITY_TYPE[2] || !!person.lastName;
    }
}
