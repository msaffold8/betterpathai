import { throttle } from '../../config';
import { applyFilters } from '../../utils/apply-filters';
import { applyPagination } from '../../utils/apply-pagination';
import { applySort } from '../../utils/apply-sort';
import { deepCopy } from '../../utils/deep-copy';
import { wait } from '../../utils/wait';
import { customer, customerLogs, customerNotes, customerOrders, customers } from './data';

class CustomersApi {
  async getCustomers(request = {}) {
    if (throttle) {
      await wait(throttle);
    }

    const { filters, page, query, rowsPerPage, sortDir, sortBy, view } = request;

    let data = deepCopy(customers);

    // Notes:
    //   "Query" represents the customer name
    //   "View" represents a specific or a group of pre-defined attributes

    if (typeof query !== 'undefined') {
      data = data.filter((customer) => {
        if (!customer.name?.toLowerCase().includes(query.toLowerCase())) {
          return false;
        }

        return true;
      });
    }

    if (typeof view !== 'undefined' && view !== 'all') {
      data = data.filter((customer) => {
        if (view === 'isReturning' && !customer.isReturning) {
          return false;
        }

        if (view === 'orderedRecently' && !customer.orderedRecently) {
          return false;
        }

        return true;
      });
    }

    if (typeof filters !== 'undefined') {
      data = applyFilters(data, filters);
    }

    const count = data.length;

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count
    });
  }

  async getCustomer(request) {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(customer);
  }

  async getCustomerOrders(request = {}) {
    if (throttle) {
      await wait(throttle);
    }

    const { sortBy, sortDir } = request;

    let data = deepCopy(customerOrders);

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    return Promise.resolve(data);
  }

  async getCustomerNotes(request = {}) {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(customerNotes);
  }

  async getCustomerLogs(request = {}) {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(customerLogs);
  }
}

export const customersApi = new CustomersApi();
