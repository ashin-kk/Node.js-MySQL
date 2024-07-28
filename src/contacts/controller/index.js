// GLOBAL PACKAGES
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

// GLOBAL MODULE
const { response } = require('../../../global/response/response');

// SQL DB OPERATIONS
const { Op } = require('sequelize');

// CONFIG
const dbConst = require('../../../config/dbConstant');
const messages = require('../extentions/messages.json');

// SERVICES
const { ContactServices } = require('../services');
const contactClass = new ContactServices();

/**
 * IDENTIFY CONTACT
 */
const identifyContact = async (req, res, next) => {
  console.log('-----------');
  console.log(' CONTACT CREATE');
  console.log('-----------');

  let httpCode = dbConst.HTTP_CODE.NOT_ACCEPTABLE;
  let result;

  try {
    //
    // RETURN FAILED RSEPONSE IF INVALID PAYLOAD
    if (!req.body.phone && !req.body.email) {
      result = {
        code: dbConst.RESULT_CODE.CANNOT_PROCESS_THE_REQUEST,
        message: messages.request_payload_missing,
        errors: [],
      };

      return response(res, httpCode, result);
    }

    //
    // SEARCH QUERY TO FIND CONTACTS
    const searchQuery = {
      where: { [Op.or]: [{ phoneNumber: req.body.phone }, { email: req.body.email }] },
    };
    const contactAllDetails = await contactClass.readAll(searchQuery);

    //
    // FINDING SAME CONTACT IS ALREADY EXIST OR NOT TO ELIMINATE DUPLICATES
    const findSameContact = contactAllDetails.find(
      (item) => item.phoneNumber === req.body.phone && item.email === req.body.email
    );

    //
    // FINDING PRIMARY CONTACT IS EXISTING OR NOT
    const findPrimaryContact = contactAllDetails.find((item) => item.linkPrecedence === 'primary');

    //
    // CREATE A NEW CONTACT IF PAYLOAD IS NOT MATCHING WITH THE EXISTING CONTACTS IF ANY
    if (!findSameContact) {
      let linkPrecedence, linkedId;
      if (!findPrimaryContact) {
        linkPrecedence = 'primary';
        linkedId = null;
      } else {
        linkPrecedence = 'secondary';
        linkedId = findPrimaryContact.id;
      }

      const createData = {
        phoneNumber: req.body.phone,
        email: req.body.email,
        linkedId: linkedId,
        linkPrecedence: linkPrecedence,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // eslint-disable-next-line no-unused-vars
      const addData = await contactClass.create(createData);
    }

    //
    // FINDING NON PRIMARY CONTACTS LIST
    const filteredNonPrimaryContacts = contactAllDetails.filter(
      (item) => item.linkPrecedence === 'primary' && item.id !== findPrimaryContact.id
    );

    //
    // UPDATE REST OF THE PIMARY CONTACTS TO SECONDARY
    if (filteredNonPrimaryContacts.length > 0) {
      const rowIDs = filteredNonPrimaryContacts.map((data) => data.id);

      const precedenceSearchQuery = { where: { id: rowIDs } };
      const precedenceUpdateQuery = {
        linkedId: findPrimaryContact.id,
        linkPrecedence: 'secondary',
        updatedAt: new Date(),
      };

      // eslint-disable-next-line no-unused-vars
      const updateContact = await contactClass.update(precedenceSearchQuery, precedenceUpdateQuery);
    }

    //
    // READING ALL CONTACTS TO MANAGE RESPONSE
    const allContacts = await contactClass.readAll(searchQuery);

    //
    // FINDING LATEST PRIMARY CONTACT DETAILS
    const newPrimaryContact = allContacts.find((item) => item.linkPrecedence === 'primary');

    //
    // FINDING ALL SECONDARY CONTACTS
    const newSecondaryContacts = allContacts.filter((item) => item.linkPrecedence === 'secondary');

    //
    // CONVERTING SECONDARY CONTACT IDS TO ARRAY
    const secondaryContactsIds = newSecondaryContacts.map((item) => item.id);

    //
    // USED NEW SET FOR REMOVING THE DUPLICATES
    // USED SORT AS PRIMARY EMAIL NEED TO BE THE FIRST ELEMENT,
    // USED MAP AS ONLY EMAILS ARE REQUIRED IN THE ARRAY
    // USED FILTERED FOR FINDING THE VALID DATA BY REMOVING NULL/EMPTY STRING
    const emailIds = [
      ...new Set(
        allContacts
          .sort((a, z) => a.linkPrecedence - z.linkPrecedence)
          .map((item) => item.email)
          .filter((data) => data)
      ),
    ];

    //
    // USED NEW SET FOR REMOVING THE DUPLICATES
    // USED SORT AS PRIMARY NUMBERS NEED TO BE THE FIRST ELEMENT,
    // USED MAP AS ONLY NUMBERS ARE REQUIRED IN THE ARRAY
    // USED FILTERED FOR FINDING THE VALID DATA BY REMOVING NULL/EMPTY STRING
    const phoneNos = [
      ...new Set(
        allContacts
          .sort((a, z) => a.linkPrecedence - z.linkPrecedence)
          .map((item) => item.phoneNumber)
          .filter((data) => data)
      ),
    ];

    //
    // RESPONSE PAYLOAD
    result = {
      code: dbConst.RESULT_CODE.SUCCESS,
      message: messages.successfull,
      contact: {
        primaryContatctId: newPrimaryContact.id,
        emails: emailIds,
        phoneNumbers: phoneNos,
        secondaryContactIds: secondaryContactsIds,
      },
    };

    httpCode = dbConst.HTTP_CODE.SUCCESS;
    return response(res, httpCode, result);
  } catch (error) {
    httpCode = dbConst.HTTP_CODE.INTERNAL_SERVER_ERROR;

    const result = {
      code: dbConst.RESULT_CODE.TECHNICAL_ERROR,
      message: dbConst.RESULT_MESSAGES.TECHNICAL_ERROR,
      errors: [],
    };

    return response(res, httpCode, result);
  }
};

module.exports = {
  identifyContact,
};
