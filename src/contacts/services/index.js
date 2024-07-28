const ContactSchema = require('../schema');

class ContactServices {
  readAll = async (searchQuery) => {
    searchQuery.raw = true;
    const data = await ContactSchema.findAll(searchQuery);
    return data;
  };

  create = async (row) => {
    const data = await ContactSchema.create(row);
    return data;
  };

  update = async (searchQuery, updateQuery) => {
    const data = await ContactSchema.update(updateQuery, searchQuery);
    return data;
  };
}

module.exports = { ContactServices };
