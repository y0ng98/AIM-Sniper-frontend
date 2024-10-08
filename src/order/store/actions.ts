import { ActionContext } from "vuex"
import { Order, OrderItem, OrderState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type OrderActions = {
    requestCartToAddOrderToDjango(
        context: ActionContext<OrderState, any>,
        payload: {
            userToken: string;
            items: {
                cartItemId: number;
                quantity: number;
                orderPrice: number
            }[]
        }
    ): Promise<AxiosResponse>;
    requestCompanyReportReadToAddOrderToDjango(
        context: ActionContext<OrderState, any>,
        payload: {
            userToken: string,
            companyReportId: number,
            companyReportPrice: number,
        }
    ): Promise<void>;
    requestMyOrderListToDjango(
        context: ActionContext<OrderState, any>,
        userToken: string
    ): Promise<void>
    requestMyOrderItemListToDjango(
        context: ActionContext<OrderState, any>, 
        ordersId: number
    ): Promise<void>
    requestOrderItemDuplicationCheckToDjango(
        context: ActionContext<OrderState, any>,
        payload: { 
            userToken: string,
            companyReportId: number,
        }
    ): Promise<void>
}

const actions: OrderActions = {
    async requestCartToAddOrderToDjango({ state }, payload) {
        try {
            const email = sessionStorage.getItem('email')
            if (!email) {
                throw new Error('User token not found')
            }
            
            // console.log('payload:', payload)
            const requestData = { 
                email,
                items: payload.items.map(item => ({
                    cartItemId: item.cartItemId,
                    quantity: item.quantity,
                    orderPrice: item.orderPrice
                }))
            }

            const response = await axiosInst.djangoAxiosInst.post('/orders/cart', requestData)
            // console.log('response data:', response.data)
            
            return response.data
        } catch (error) { 
            console.error('장바구니 페이지에서 상품 구매시 에러 발생:', error)
            throw error
        }
    },
    async requestCompanyReportReadToAddOrderToDjango(context: ActionContext<OrderState, any>, payload: {
        userToken: string, companyReportId: number, companyReportPrice: number}
        ): Promise<void> {
        try {
            const { userToken, companyReportId, companyReportPrice } = payload
            
            // console.log('payload:', payload)

            const response = await axiosInst.djangoAxiosInst.post('/orders/company_report', payload )
            // console.log('response data:', response.data)
            
            return response.data
        } catch (error) { 
            console.error('상품 페이지에서 상품 구매 시 에러 발생:', error)
            throw error
        }
    },
    async requestMyOrderListToDjango(context: ActionContext<OrderState, any>, userToken: string): Promise<void> {
        try {
            const email = sessionStorage.getItem("email")
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.post('/orders/list/', { email: email });
            // console.log('data:', res)
            const data: Order[] = res.data;
            // console.log('data:', data)
            context.commit('REQUEST_MY_ORDER_LIST_TO_DJANGO', data);
        } catch (error) {
            console.error('나의 주문 내역 출력 과정 중 에러 발생:', error);
            throw error
        }
    },
    async requestMyOrderItemListToDjango(context: ActionContext<OrderState, any>, ordersId: number): Promise<void> {
        try {
            const res: AxiosResponse<OrderItem> = await axiosInst.djangoAxiosInst.post(`/orders/read/${ordersId}`);
            // console.log('order item list data:', res.data)
            context.commit('REQUEST_MY_ORDER_ITEM_LIST_TO_DJANGO', res.data);
        } catch (error) {
            console.error('requestMyOrderItemListToDjango() 문제 발생:', error);
            throw error
        }
    },
    async requestOrderItemDuplicationCheckToDjango(
        context: ActionContext<OrderState, any>,
        payload: {
            userToken: string, companyReportId: number
        }): Promise<void> {
        const { userToken, companyReportId } = payload
        const res = await axiosInst.djangoAxiosInst
        .post('/orders/order-item-duplication-check', { payload })
        return res.data
    },
}

export default actions