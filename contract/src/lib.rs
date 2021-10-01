// use the attribute below for unit tests
#[cfg(test)]
mod tests {    
    fn get_context() -> VMContext {
        VMContext {
            predecessor_account_id: "jodeperezlo.testnet".to_string(),
            current_account_id: "jodeperezlo.testnet".to_string(),
            signer_account_id: "drfic.testnet".to_string(),
            signer_account_pk: vec![0],
            input: vec![],
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view: false,
            output_data_receivers: vec![],
            epoch_height: 19,
            storage_usage: 1000
        }
    }
}