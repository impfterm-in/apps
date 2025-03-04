// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

export async function verifiedProviderData(state, keyStore, settings) {
    const backend = settings.get('backend');

    try {
        // we lock the local backend to make sure we don't have any data races
        await backend.local.lock('verifiedProviderData');
    } catch (e) {
        throw null; // we throw a null exception (which won't affect the store state)
    }

    try {
        const providerData = backend.local.get('provider::data::verified');
        return {
            status: 'loaded',
            data: providerData,
        };
    } finally {
        backend.local.unlock('verifiedProviderData');
    }
}

verifiedProviderData.actionName = 'verifiedProviderData';
