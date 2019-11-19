class APIFeatures {
  constructor(queryDb, navigationQuery) {
    this.queryDb = queryDb;
    this.navigationQuery = navigationQuery;
  }

  sort() {
    if (this.navigationQuery.sort) {
      const sortBy = this.navigationQuery.sort.split(',').join(' ');
      this.queryDb = this.queryDb.sort(sortBy);
    } else {
      this.queryDb = this.queryDb.sort('-updatedAt');
    }
    return this;
  }

  paginate() {
    // Current page
    const page = +this.navigationQuery.page || 1;
    // Page size
    const limit = +this.navigationQuery.limit || 0;
    // Items to skip
    const skip = (page - 1) * limit;
    this.queryDb = this.queryDb.skip(skip).limit(limit);
    return this;
  }

}

module.exports = APIFeatures;
