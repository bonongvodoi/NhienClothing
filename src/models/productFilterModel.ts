export class ProductFilterModel {
  searchTerm: string = '';
  page: number = 1;
  limit: number = 50;
  sort: string = 'updatedAt';
  isAsc: boolean = false;
  constructor(filter) {
    if (filter) {
      if (filter.searchTerm)
        this.searchTerm = filter.searchTerm;
      if (filter.page)
        this.page = filter.page;
      if (filter.limit)
        this.limit = filter.limit;
      if (filter.sort)
        this.sort = filter.sort;
      if (filter.sort)
        this.sort = filter.sort;
      this.isAsc = !!filter.isAsc;
    }
  }
}