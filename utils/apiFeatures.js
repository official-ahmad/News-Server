class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.keyword) {
      this.query = this.query.find({
        title: { $regex: this.queryString.keyword, $options: "i" },
      });
    }
    return this;
  }

  paginate(resultPerPage) {
    const page = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (page - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
