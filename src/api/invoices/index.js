import { throttle } from '../../config';
import { applyFilters } from '../../utils/apply-filters';
import { applyPagination } from '../../utils/apply-pagination';
import { applySort } from '../../utils/apply-sort';
import { deepCopy } from '../../utils/deep-copy';
import { wait } from '../../utils/wait';
import { invoice, invoices } from './data';

class InvoicesApi {
  async getInvoices(request = {}) {
    if (throttle) {
      await wait(throttle);
    }

    const { filters, page, query, rowsPerPage, sortBy, sortDir, view } = request;

    let data = deepCopy(invoices);

    // Notes:
    //   "Query" represents the invoice ref
    //   "View" represents the invoice status

    if (typeof query !== 'undefined') {
      data = data.filter((invoice) => {
        if (!invoice.ref?.toLowerCase().includes(query.toLowerCase())) {
          return false;
        }

        return true;
      });
    }

    if (typeof view !== 'undefined' && view !== 'all') {
      data = data.filter((invoice) => {
        return invoice.status === view;
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

  async getInvoice(request) {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(invoice);
  }
}

export const invoicesApi = new InvoicesApi();
