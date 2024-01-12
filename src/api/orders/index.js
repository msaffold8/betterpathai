import { throttle } from '../../config';
import { applyFilters } from '../../utils/apply-filters';
import { applyPagination } from '../../utils/apply-pagination';
import { applySort } from '../../utils/apply-sort';
import { deepCopy } from '../../utils/deep-copy';
import { wait } from '../../utils/wait';
import { order, orders } from './data';

class OrdersApi {
  async getOrders(request = {}) {
    if (throttle) {
      await wait(throttle);
    }

    const { filters, page, query, rowsPerPage, sortBy, sortDir, view } = request;

    let data = deepCopy(orders);

    // Notes:
    //   "Query" represents the order ID
    //   "View" represents the order status

    if (typeof query !== 'undefined') {
      data = orders.filter((order) => {
        if (!order.id.toLowerCase().includes(query.toLowerCase())) {
          return false;
        }

        return true;
      });
    }

    if (typeof view !== 'undefined' && view !== 'all') {
      data = orders.filter((order) => {
        return order.status === view;
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

  async getOrder(request) {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(order);
  }
}

export const ordersApi = new OrdersApi();
