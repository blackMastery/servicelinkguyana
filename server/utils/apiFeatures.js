class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
      this.page;
      this.limit;
      this.skip
    }
  
    filter() {
      const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(el => delete queryObj[el]);
  
      // 1B) Advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
  
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
  
      return this;
    }
  
    paginate() {
      this.page = this.queryString.page * 1 || 1;
      this.limit = this.queryString.limit * 1 || 100;
      this.skip = (this.page - 1) * this.limit;
  
      this.query = this.query.skip(this.skip).limit(this.limit);
  
      return this;
    }
  }
  module.exports = APIFeatures;
  