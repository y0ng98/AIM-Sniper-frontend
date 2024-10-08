import { MutationTree } from "vuex";
import { AccountState, Account } from "./states";
import { REQUEST_NICKNAME_TO_DJANGO, REQUEST_EMAIL_TO_DJANGO,REQUEST_GENDER_TO_DJANGO, REQUEST_BIRTHYEAR_TO_DJANGO,REQUEST_IS_ADMIN_TO_DJANGO } from "./mutation-types";

export interface AccountMutations extends MutationTree<AccountState> {
    [REQUEST_NICKNAME_TO_DJANGO](state: AccountState, receivedData: Account): void
    [REQUEST_EMAIL_TO_DJANGO](state: AccountState, receivedData: Account): void
    [REQUEST_GENDER_TO_DJANGO](state: AccountState, receivedData: Account): void
    [REQUEST_BIRTHYEAR_TO_DJANGO](state: AccountState, receivedData: Account): void
    [REQUEST_IS_ADMIN_TO_DJANGO](state: AccountState,settingValue:boolean): void
}

const mutations: MutationTree<AccountState> = {
    [REQUEST_NICKNAME_TO_DJANGO](state: AccountState, receivedData: Account): void {
        state.account = receivedData
    },
    [REQUEST_EMAIL_TO_DJANGO](state: AccountState, receivedData: Account): void {
        state.account = receivedData
    },
    [REQUEST_GENDER_TO_DJANGO](state: AccountState, receivedData: Account): void {
        state.account = receivedData
    },
    [REQUEST_BIRTHYEAR_TO_DJANGO](state: AccountState, receivedData: Account): void {
        state.account = receivedData
    },
    [REQUEST_IS_ADMIN_TO_DJANGO](state: AccountState,settingValue:boolean): void{
        state.isNormalAdmin = settingValue
    }
}

export default mutations as AccountMutations