export const LANGUAGE = Symbol.keyFor(Symbol.for('LANGUAGE'))

export const TOKEN_INFO = Symbol.keyFor(Symbol.for('TOKEN_INFO'))

export const VALIDITY = 'VALIDITY'

export const TOKEN_STATUS = {
    VALID: 1,
    INVALID: -1,
    ABSENT: 0,
}

export const UI_BREAKPOINTS = {
    XS: 0,
    SM: 576,
    MD: 768,
    LG: 992,
    XL: 1280,
}

export const ALLOWED_LANGUAGE_CODES = {
    EN: 'en',
    PL: 'pl',
    ZH: 'zh',
}

export const ALLOWED_LANGUAGES_ARRAY = Object.values(ALLOWED_LANGUAGE_CODES)

export const SHOP_INFO = Symbol.keyFor(Symbol.for('SHOP_INFO'))

export const SERVER_TYPES = {
    INT: 'Int32',
    DECIMAL: 'Decimal',
    STRING: 'String',
    BOOL: 'Boolean',
}

export const PAYMENT_TYPES = {
    QUICK_PAYU: 1,
}
export const LANGUAGE_IDS = {
    PL: 1,
}

export const MAIN_CONFIGURATION_GROUPS = {
    PAYMENTS: 'Payments',
    THEME: 'theme',
    DOMAIN: 'domain',
    INTEGRATIONS: 'Integrations',
    META_TAGS: 'MetaTags',
    EMAILS: 'emails',
    EXPORT_XML: 'export-xml',
    OTHER: 'Other',
    DOCUMENTS: 'Documents',
}

export const LOCAL_CONFIGURATION_GROUPS = {
    PAYMENTS: 'Payments',
}

export const STATUSES = {
    SUCCESS: 'SUCCESS',
    FAIL: 'FAIL',
}

export const SEC_IN_MS = 1000
export const MIN_IN_MS = 1000 * 60
export const H_IN_MS = 1000 * 60 * 60
export const DAY_IN_MS = 1000 * 60 * 60 * 24

export const AFFILIATE_LINK =
    '?lan=en&aff_platform=link-c-tool&cpt=1562243112246&sk=bZQxguWG&aff_trace_key=e04bfd37b811434688ea074e72bda57a-1562243112246-05533-bZQxguWG&terminal_id=50b6c8fdef034d578263d31cb29ca538'
