/*!------------------------------------------------------------------
 * Copyright 2019 Reindeer Technology Pte. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*-------------------------------------------------------------------*/
import Vue from 'vue'
Vue.prototype.$reindeerSchemaCDD = (modelObj) => {
var modelUri=modelObj["uri"];
var model={
    validate: true,
    schemas: [{
        uri: "https://reindeer.tech/cdd-schema/v1/core-schema.json", // id of the first schema
        fileMatch: [modelUri.toString()], // associate with our model
        schema: {
            title: modelObj["i18n"]("cdd_t"),
            description: modelObj["i18n"]("cdd_d"),
            type: "object",
            required: ["reindeer","self","info","actors","resources","contexts"],
            properties: {
                reindeer: {
                    title: modelObj["i18n"]("cdd_reindeer_t"),
                    description: modelObj["i18n"]("cdd_reindeer_d"),
                    type: "string",
                    enum: ["1.1.0"]
                },
                self: {
                    title: modelObj["i18n"]("cdd_self_t"),
                    description: modelObj["i18n"]("cdd_self_d"),
                    type: "string",
                    default: "cloudDesign.json",
                    pattern: "^[a-zA-Z0-9]+\\.(yaml|yml|json)$"
                },
                info: {
                    title: modelObj["i18n"]("cdd_info_t"),
                    description: modelObj["i18n"]("cdd_info_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/info.json"
                },
                actors: {
                    title: modelObj["i18n"]("cdd_actors_t"),
                    description: modelObj["i18n"]("cdd_actors_d"),
                    type: "object",
                    patternProperties:{
                        "^[0-9a-zA-Z]+$": {
                            anyOf: [
                                { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/marketTypeOfActor.json"},
                                { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/personsTypeOfActor.json"},
                                { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/externalSystemTypeOfActor.json"},
                                { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToActor.json"}
                            ]
                        }
                    },
                    additionalProperties: false 
                },
                resources: {
                    title: modelObj["i18n"]("cdd_resources_t"),
                    description: modelObj["i18n"]("cdd_resources_d"),
                    type: "array",
                    items:{
                        type: "object", 
                        $ref: "https://reindeer.tech/cdd-schema/v1/resource.json"
                    },
                    additionalProperties: false 
                },
                contexts: {
                    title: modelObj["i18n"]("cdd_contexts_t"),
                    description:  modelObj["i18n"]("cdd_contexts_d"),
                    type: "object",
                    patternProperties:{
                        "^[0-9a-zA-Z]+$": {
                            anyOf: [
                                { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/context.json"},
                                { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToContext.json"}
                            ]
                        }
                    },
                    additionalProperties: false 
                },
                components: {
                    title: modelObj["i18n"]("cdd_components_t"),
                    description:  modelObj["i18n"]("cdd_components_d"),
                    type: "object",
                    properties:{
                        actors: {
                            title: modelObj["i18n"]("cdd_components_actors_t"),
                            description:  modelObj["i18n"]("cdd_components_actors_d"),
                            type: "object",
                            patternProperties:{
                                "^[0-9a-zA-Z]+$": {
                                    anyOf: [
                                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/marketTypeOfActor.json"},
                                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/personsTypeOfActor.json"},
                                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/externalSystemTypeOfActor.json"}
                                    ]
                                }
                            },
                            "additionalProperties": false
                        },
                        contexts: {
                            title: modelObj["i18n"]("cdd_components_contexts_t"),
                            description:  modelObj["i18n"]("cdd_components_contexts_d"),
                            type: "object",
                            patternProperties:{
                                "^[0-9a-zA-Z]+$": {
                                    type: "object", 
                                    oneOf: [
                                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/context.json"}
                                    ]
                                }
                            },
                            "additionalProperties": false
                        },
                        markets: {
                            title: modelObj["i18n"]("cdd_components_markets_t"),
                            description:  modelObj["i18n"]("cdd_components_markets_d"),
                            type: "object",
                            patternProperties:{
                                "^[0-9a-zA-Z]+$": {
                                    type: "object", 
                                    oneOf: [
                                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/market.json"}
                                    ]
                                }
                            },
                            "additionalProperties": false
                        },
                        triggers: {
                            title: modelObj["i18n"]("cdd_components_triggers_t"),
                            description:  modelObj["i18n"]("cdd_components_triggers_d"),
                            type: "object",
                            patternProperties:{
                                "^[0-9a-zA-Z]+$": {
                                    type: "object", 
                                    oneOf: [
                                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/webAccessTypeOfTrigger.json"},
                                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/timedActionTypeOfTrigger.json"}
                                    ]
                                }
                            },
                            "additionalProperties": false
                        },
                        traffics: {
                            title: modelObj["i18n"]("cdd_components_traffics_t"),
                            description:  modelObj["i18n"]("cdd_components_traffics_d"),
                            type: "object",
                            patternProperties:{
                                "^[0-9a-zA-Z]+$": {
                                    oneOf: [
                                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/passThroughRatioTypeOfTraffic.json"}
                                    ]
                                }
                            },
                            "additionalProperties": false
                        },
                        infoTypes: {
                            title: modelObj["i18n"]("cdd_components_infoTypes_t"),
                            description:  modelObj["i18n"]("cdd_components_infoTypes_d"),
                            type: "object",
                            patternProperties:{
                                "^[0-9a-zA-Z]+$": {
                                    type: "object", 
                                    $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"
                                }
                            },
                            "additionalProperties": false
                        }
                    },
                    additionalProperties: false 
                }
            },
            "additionalProperties": false
        }
    }, 
    {
        uri: "https://reindeer.tech/cdd-schema/v1/info.json",
        schema: {
            title: modelObj["i18n"]("cdd_infoObj_t"),
            description:  modelObj["i18n"]("cdd_infoObj_d"),
            type: "object",
            required: ["version", "license", "title", "description", "status", "designedAt", "authors"],
            properties: {
                version: {
                    title: modelObj["i18n"]("cdd_infoObj_version_t"),
                    description:  modelObj["i18n"]("cdd_infoObj_version_d"),
                    default: "1.0.0",
                    type: "string"
                },
                license: {
                    title: modelObj["i18n"]("cdd_infoObj_license_t"),
                    description:  modelObj["i18n"]("cdd_infoObj_license_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/license.json"
                },
                title: {
                    title: modelObj["i18n"]("cdd_infoObj_title_t"),
                    description:  modelObj["i18n"]("cdd_infoObj_title_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd_infoObj_description_t"),
                    description:  modelObj["i18n"]("cdd_infoObj_description_d"),
                    type:"object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                status: {
                    title: modelObj["i18n"]("cdd_infoObj_status_t"),
                    description:  modelObj["i18n"]("cdd_infoObj_status_d"),
                    type: "string",
                    enum: ["idea","draft","production"]
                },
                designedAt: {
                    title: modelObj["i18n"]("cdd_infoObj_designedAt_t"),
                    description:  modelObj["i18n"]("cdd_infoObj_designedAt_d"),
                    type: "integer",
                    minimum: 1
                },
                authors: {
                    title: modelObj["i18n"]("cdd_infoObj_authors_t"),
                    description:  modelObj["i18n"]("cdd_infoObj_authors_d"),
                    type: "object",
                    patternProperties:{
                        "^[0-9a-zA-Z]+$": {
                            type: "object",
                            $ref: "https://reindeer.tech/cdd-schema/v1/author.json"
                        }
                    },
                    "additionalProperties": false
                },
                organizations: {
                    title: modelObj["i18n"]("cdd_infoObj_organizations_t"),
                    description:  modelObj["i18n"]("cdd_infoObj_organizations_d"),
                    type: "object",
                    patternProperties:{
                        "^[0-9a-zA-Z]+$": {
                            type: "object",
                            $ref: "https://reindeer.tech/cdd-schema/v1/organization.json"
                        }
                    },
                    "additionalProperties": false
                },
            },
            "additionalProperties": false
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/marketTypeOfActor.json",
        schema: {
            title: modelObj["i18n"]("cdd_marketActorObj_t"),
            description:  modelObj["i18n"]("cdd_marketActorObj_d"),
            type: "object",
            required: ["type", "title", "description", "market", "marketShare", "sourceIdentification"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd_marketActorObj_type_t"),
                    description:  modelObj["i18n"]("cdd_marketActorObj_type_d"),
                    type: "string",
                    enum: ["market"]
                },
                title: {
                    title: modelObj["i18n"]("cdd_marketActorObj_title_t"),
                    description:  modelObj["i18n"]("cdd_marketActorObj_title_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd_marketActorObj_description_t"),
                    description:  modelObj["i18n"]("cdd_marketActorObj_description_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                market: {
                    title: modelObj["i18n"]("cdd_marketActorObj_market_t"),
                    description:  modelObj["i18n"]("cdd_marketActorObj_market_d"),
                    type: "object",
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/market.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToMarket.json"}
                    ]
                },
                marketShare: {
                    title: modelObj["i18n"]("cdd_marketActorObj_marketShare_t"),
                    description:  modelObj["i18n"]("cdd_marketActorObj_marketShare_d"), 
                    type: "number",
                    minimum: 0,
                    maximum: 1
                },
                sourceIdentification:{
                    title: modelObj["i18n"]("cdd_marketActorObj_sourceIdentification_t"),
                    description:  modelObj["i18n"]("cdd_marketActorObj_sourceIdentification_d"),
                    type: "boolean",
                },
                identificationGroup: {
                    title: modelObj["i18n"]("cdd_marketActorObj_identificationGroup_t"),
                    description:  modelObj["i18n"]("cdd_marketActorObj_identificationGroup_d"),
                    type: "string",
                    $ref: "https://reindeer.tech/cdd-schema/v1/ip.json"
                }
            },
            dependencies: {
                identificationGroup: {
                    properties: {
                        sourceIdentification: {
                             enum: [true]
                        }
                    }
                }
            },
            "additionalProperties": false
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/personsTypeOfActor.json",
        schema: {
            title: modelObj["i18n"]("cdd_personsActorObj_t"),
            description:  modelObj["i18n"]("cdd_personsActorObj_d"),
            type: "object",
            required: ["type", "title", "description", "num", "sourceIdentification"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd_personsActorObj_type_t"),
                    description:  modelObj["i18n"]("cdd_personsActorObj_type_d"),
                    type: "string",
                    enum: ["persons"]
                },
                title: {
                    title: modelObj["i18n"]("cdd_personsActorObj_title_t"),
                    description:  modelObj["i18n"]("cdd_personsActorObj_title_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd_personsActorObj_description_t"),
                    description:  modelObj["i18n"]("cdd_personsActorObj_description_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                num: {
                    title: modelObj["i18n"]("cdd_personsActorObj_num_t"),
                    description:  modelObj["i18n"]("cdd_personsActorObj_num_d"),
                    type: "integer",
                    minimum: 1
                },
                sourceIdentification:{
                    title: modelObj["i18n"]("cdd_marketActorObj_sourceIdentification_t"),
                    description:  modelObj["i18n"]("cdd_marketActorObj_sourceIdentification_d"),
                    type: "boolean",
                },
                identificationGroup: {
                    title: modelObj["i18n"]("cdd_personsActorObj_identificationGroup_t"),
                    description:  modelObj["i18n"]("cdd_personsActorObj_identificationGroup_d"),
                    type: "string",
                    $ref: "https://reindeer.tech/cdd-schema/v1/ip.json"                 
                }
            },
            dependencies: {
                identificationGroup: {
                    properties: {
                        sourceIdentification: {
                             enum: [true]
                        }
                    }
                }
            },
            "additionalProperties": false
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/externalSystemTypeOfActor.json",
        schema: {
            title: modelObj["i18n"]("cdd_externalSystemActorObj_t"),
            description:  modelObj["i18n"]("cdd_externalSystemActorObj_d"),
            type: "object",
            required: ["type", "title", "description",  "sourceIdentification"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd_externalSystemActorObj_type_t"),
                    description:  modelObj["i18n"]("cdd_externalSystemActorObj_type_d"),
                    type: "string",
                    enum: ["externalSystem"]
                },
                title: {
                    title: modelObj["i18n"]("cdd_externalSystemActorObj_title_t"),
                    description:  modelObj["i18n"]("cdd_externalSystemActorObj_title_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd_externalSystemActorObj_description_t"),
                    description:  modelObj["i18n"]("cdd_externalSystemActorObj_description_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                sourceIdentification:{
                    title: modelObj["i18n"]("cdd_marketActorObj_sourceIdentification_t"),
                    description:  modelObj["i18n"]("cdd_marketActorObj_sourceIdentification_d"),
                    type: "boolean",
                },
                identificationGroup: {
                    title: modelObj["i18n"]("cdd_externalSystemActorObj_identificationGroup_t"),
                    description:  modelObj["i18n"]("cdd_externalSystemActorObj_identificationGroup_d"),
                    type: "string",
                    $ref: "https://reindeer.tech/cdd-schema/v1/ip.json"                    
                }
            },
            dependencies: {
                identificationGroup: {
                    properties: {
                        sourceIdentification: {
                             enum: [true]
                        }
                    }
                }
            },
            "additionalProperties": false
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/resource.json",
        schema: {
            title: modelObj["i18n"]("cdd_resource_t"),
            description:  modelObj["i18n"]("cdd_resource_d"),
            type: "object",
            required: ["type","$ref"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd_resource_type_t"),
                    description:  modelObj["i18n"]("cdd_resource_type_d"),
                    type: "string",
                    enum: ["acf","arm","gdm","aro","tfm","slf","oth"]
                },
                $ref: {
                    title: modelObj["i18n"]("cdd_resource_ref_t"),
                    description:  modelObj["i18n"]("cdd_resource_ref_d"),
                    type: "string",
                    default: "externalFile.json",
                    pattern: "^[a-zA-Z0-9]+\\.(yaml|yml|json)$"
                }
            },
            "additionalProperties": false
        }
    }, 
    {
        uri: "https://reindeer.tech/cdd-schema/v1/context.json",
        schema: {
            title: modelObj["i18n"]("cdd_context_t"),
            description:  modelObj["i18n"]("cdd_context_d"),            
            type: "object",
            required: ["title", "description", "trigger",  "traffics"],
            properties: {
                title: {
                    title: modelObj["i18n"]("cdd_context_title_t"),
                    description:  modelObj["i18n"]("cdd_context_title_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd_context_description_t"),
                    description:  modelObj["i18n"]("cdd_context_description_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                trigger: {
                    title: modelObj["i18n"]("cdd_context_trigger_t"),
                    description:  modelObj["i18n"]("cdd_context_trigger_d"),
                    type: "object",
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/webAccessTypeOfTrigger.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/timedActionTypeOfTrigger.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToTrigger.json"}
                    ]      
                },
                traffics: {
                    title: modelObj["i18n"]("cdd_context_traffics_t"),
                    description:  modelObj["i18n"]("cdd_context_traffics_d"),
                    type: "object",
                    patternProperties:{
                        "^[0-9a-zA-Z]+$": {
                            anyOf: [
                                { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/passThroughRatioTypeOfTraffic.json"},
                                { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToTraffic.json"}
                            ]
                        }
                    },
                    "additionalProperties": false         
                }
            },
            "additionalProperties": false
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/license.json",
        schema: {
            title: modelObj["i18n"]("cdd_license_t"),
            description:  modelObj["i18n"]("cdd_license_d"),             
            type: "object",
            required: ["type"],
            if: { properties:{ type: { enum:["Closed","OtherOpen"] }}},
            then: { required:["provider"]},
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd_license_type_t"),
                    description:  modelObj["i18n"]("cdd_license_type_d"),
                    type: "string",
                    default: "CC0",
                    enum: [
                        "CC0",
                        "Apache-2.0",
                        "MIT",
                        "BSD-2-Clause",
                        "OtherOpen",
                        "Closed"
                    ]
                },
                provider: {
                    title: modelObj["i18n"]("cdd_license_provider_t"),
                    description:  modelObj["i18n"]("cdd_license_provider_d"),
                    type: "string"
                }
            },
            additionalProperties: false 
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/author.json",
        schema: {
            title: modelObj["i18n"]("cdd_author_t"),
            description:  modelObj["i18n"]("cdd_author_d"),
            type: "object",
            required: ["roles","joinedAt"],
            properties: {
                roles: {
                    title: modelObj["i18n"]("cdd_author_roles_t"),
                    description:  modelObj["i18n"]("cdd_author_roles_d"),
                    type: "array",
                    items: {
                        type: "string",
                        enum: ["planner","designer","auditor","operator","others"]
                    }
                },
                joinedAt: {
                    title: modelObj["i18n"]("cdd_author_joinedAt_t"),
                    description:  modelObj["i18n"]("cdd_author_joinedAt_d"),
                    type: "integer",
                    minimum: 1
                },
                leavedAt: {
                    title: modelObj["i18n"]("cdd_author_leavedAt_t"),
                    description: modelObj["i18n"]("cdd_author_leavedAt_d"),
                    type: "integer",
                    minimum: 1
                },
                sign: {
                    title: modelObj["i18n"]("cdd_author_sign_t"),
                    description: modelObj["i18n"]("cdd_author_sign_d"),
                    type: "string",
                    minimum: 1
                }               
            },
            additionalProperties: false 
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/organization.json",
        schema: {
            title: modelObj["i18n"]("cdd_organization_t"),
            description:  modelObj["i18n"]("cdd_organization_d"),
            type: "object",
            required: ["joinedAt"],
            properties: {
                joinedAt: {
                    title: modelObj["i18n"]("cdd_organization_joinedAt_t"),
                    description:  modelObj["i18n"]("cdd_organization_joinedAt_d"),
                    type: "integer",
                    minimum: 1
                },
                leavedAt: {
                    title: modelObj["i18n"]("cdd_organization_leavedAt_t"),
                    description: modelObj["i18n"]("cdd_organization_leavedAt_d"),
                    type: "integer",
                    minimum: 1
                },
                sign: {
                    title: modelObj["i18n"]("cdd_organization_sign_t"),
                    description: modelObj["i18n"]("cdd_organization_sign_d"),
                    type: "string",
                    minimum: 1
                }               
            },
            additionalProperties: false 
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/market.json",
        schema: {
            title: modelObj["i18n"]("cdd_market_t"),
            description: modelObj["i18n"]("cdd_market_d"),
            type: "object",
            required: ["title", "description", "num", "estimatedBy", "estimatedAt"],
            properties: {
                title: {
                    title: modelObj["i18n"]("cdd_market_title_t"),
                    description: modelObj["i18n"]("cdd_market_title_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd_market_description_t"),
                    description: modelObj["i18n"]("cdd_market_description_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                num: {
                    title: modelObj["i18n"]("cdd_market_num_t"),
                    description: modelObj["i18n"]("cdd_market_num_d"),
                    type: "integer",
                    minimum: 1
                },
                estimatedBy: {
                    title: modelObj["i18n"]("cdd_market_estimatedBy_t"),
                    description: modelObj["i18n"]("cdd_market_estimatedBy_d"),
                    type: "string"
                },
                estimatedAt: {
                    title: modelObj["i18n"]("cdd_market_estimatedAt_t"),
                    description: modelObj["i18n"]("cdd_market_estimatedAt_d"),                    
                    type: "integer",
                    minimum: 1
                },
                "additionalProperties": false
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/infoType.json",
        schema: {
            title: modelObj["i18n"]("cdd_infoType_t"),
            description: modelObj["i18n"]("cdd_infoType_d"),
            type: "object",
            required: ["title", "description", "confidential", "privacy", "definedBy","definedAt"],
            properties: {
                title: {
                    title: modelObj["i18n"]("cdd_infoType_title_t"),
                    description: modelObj["i18n"]("cdd_infoType_title_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd_infoType_description_t"),
                    description: modelObj["i18n"]("cdd_infoType_description_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                confidential: {
                    title: modelObj["i18n"]("cdd_infoType_confidential_t"),
                    description: modelObj["i18n"]("cdd_infoType_confidential_d"),
                    type: "boolean"
                },
                privacy: {
                    title: modelObj["i18n"]("cdd_infoType_privacy_t"),
                    description: modelObj["i18n"]("cdd_infoType_privacy_d"),                    
                    type: "boolean"
                },
                definedBy: {
                    title: modelObj["i18n"]("cdd_infoType_definedBy_t"),
                    description: modelObj["i18n"]("cdd_infoType_definedBy_d"),
                    type: "string"
                },
                definedAt: {
                    title: modelObj["i18n"]("cdd_infoType_definedAt_t"),
                    description: modelObj["i18n"]("cdd_infoType_definedAt_d"),                    
                    type: "integer",
                    minimum: 1
                },
                "additionalProperties": false
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/title.json",
        schema: {
            type: "object",
            patternProperties:{
                "^[a-z]{2}$": {
                    type: "string",
                    minLength: 1,
                    maxLength: 30
                }
            },
            additionalProperties: false 
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/description.json",
        schema: {     
            type: "object",
            patternProperties:{
                "^[a-z]{2}$": {
                    type: "string",
                    maxLength: 255
                }
            },
            additionalProperties: false 
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/ip.json",
        schema: {     
            type: "string",
            pattern: "^[a-zA-Z0-9]+$"
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToActor.json",
        schema: {
            title: modelObj["i18n"]("cdd_reference_t"),
            description: modelObj["i18n"]("cdd_reference_d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd_reference_ref_t"),
                    description: modelObj["i18n"]("cdd_reference_ref_d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+(\/components\/actors|\/actors)+\/[a-zA-Z0-9]+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToResources.json",
        schema: {
            title: modelObj["i18n"]("cdd_reference_t"),
            description: modelObj["i18n"]("cdd_reference_d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd_reference_ref_t"),
                    description: modelObj["i18n"]("cdd_reference_ref_d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+\/+.+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToContext.json",
        schema: {
            title: modelObj["i18n"]("cdd_reference_t"),
            description: modelObj["i18n"]("cdd_reference_d"),   
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd_reference_ref_t"),
                    description: modelObj["i18n"]("cdd_reference_ref_d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+\/components\/contexts\/[a-zA-Z0-9]+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToTrigger.json",
        schema: {    
            title: modelObj["i18n"]("cdd_reference_t"),
            description: modelObj["i18n"]("cdd_reference_d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd_reference_ref_t"),
                    description: modelObj["i18n"]("cdd_reference_ref_d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+(\/components\/triggers\/+([a-zA-Z0-9])|\/contexts\/+([a-zA-Z0-9])+\/trigger)+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToTraffic.json",
        schema: {     
            title: modelObj["i18n"]("cdd_reference_t"),
            description: modelObj["i18n"]("cdd_reference_d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd_reference_ref_t"),
                    description: modelObj["i18n"]("cdd_reference_ref_d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+(\/components\/traffics|\/contexts\/+([a-zA-Z0-9])+\/traffics)+\/[a-zA-Z0-9]+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json",
        schema: {     
            title: modelObj["i18n"]("cdd_reference_t"),
            description: modelObj["i18n"]("cdd_reference_d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd_reference_ref_t"),
                    description: modelObj["i18n"]("cdd_reference_ref_d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+\/components\/infoTypes\/[a-zA-Z0-9]+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToMarket.json",
        schema: {     
            title: modelObj["i18n"]("cdd_reference_t"),
            description: modelObj["i18n"]("cdd_reference_d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd_reference_ref_t"),
                    description: modelObj["i18n"]("cdd_reference_ref_d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+\/components\/markets\/[a-zA-Z0-9]+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/webAccessTypeOfTrigger.json",
        schema: {
            title: modelObj["i18n"]("cdd_webAccessTrigger_t"),
            description: modelObj["i18n"]("cdd_webAccessTrigger_d"),
            type: "object",
            required: ["type", "description","infoType", "ports", "internet","restriction","dau", "pagesVisit","kbPage","reqPage","busyHours","postsVisit","kbPost","start","end","endpointTitle","storedRatio"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_type_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_type_d"),
                    type: "string",
                    enum: ["webAccess"]
                },
                description: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_description_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_description_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                infoType: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_infoType_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_infoType_d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                ports: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_ports_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_ports_d"),                    
                    type: "array",
                    items: {
                        type: "integer"
                    }
                },
                internet: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_internet_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_internet_d"),                    
                    type: "boolean"
                },
                restriction: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_restriction_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_restriction_d"),                    
                    type: "boolean"
                },
                dau: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_dau_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_dau_d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                pagesVisit: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_pagesVisit_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_pagesVisit_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                kbPage: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_kbPage_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_kbPage_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                reqPage: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_reqPage_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_reqPage_d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                busyHours: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_busyHours_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_busyHours_d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                postsVisit: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_postsVisit_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_postsVisit_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                kbPost: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_kbPost_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_kbPost_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                start: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_start_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_start_d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToActor.json"}
                    ]
                },
                end: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_end_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_end_d"),
                    type: "array",
                    items: {
                        type: "object", 
                        $ref: "https://reindeer.tech/cdd-schema/v1/refToResources.json"
                    }
                },
                endpointTitle: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_endpointTitle_t"),
                    description:  modelObj["i18n"]("cdd_webAccessTrigger_endpointTitle_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                storedRatio: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_storedRatio_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_storedRatio_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                storedInfoType: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_storedInfoType_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_storedInfoType_d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                storageDescription: {
                    title: modelObj["i18n"]("cdd_webAccessTrigger_storageDescription_t"),
                    description: modelObj["i18n"]("cdd_webAccessTrigger_storageDescription_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                "additionalProperties": false
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/timedActionTypeOfTrigger.json",
        schema: {     
            title: modelObj["i18n"]("cdd_timedActionTrigger_t"),
            description: modelObj["i18n"]("cdd_timedActionTrigger_d"),
            type: "object",
            required: ["type", "description","infoType", "ports", "internet","restriction","onlineRps", "reqMonth","kbRequest","kbResponse","start","end","endpointTitle","storedRatio"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_type_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_type_d"),
                    type: "string",
                    enum: ["timedAction"]
                },
                description: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_description_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_description_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                infoType: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_infoType_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_infoType_d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                ports: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_ports_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_ports_d"),                    
                    type: "array",
                    items: {
                        type: "integer"
                    }
                },
                internet: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_internet_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_internet_d"),                    
                    type: "boolean"
                },
                restriction: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_restriction_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_restriction_d"),                    
                    type: "boolean"
                },
                onlineRps: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_onlineRps_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_onlineRps_d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                reqMonth: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_reqMonth_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_reqMonth_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                kbRequest: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_kbRequest_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_kbRequest_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                kbResponse: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_kbResponse_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_kbResponse_d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                start: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_start_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_start_d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToActor.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToResources.json"}
                    ]
                },
                end: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_end_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_end_d"),
                    type: "array",
                    items: {
                        anyOf: [
                            { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToActor.json"},
                            { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToResources.json"}
                        ]
                    }
                },
                endpointTitle: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_endpointTitle_t"),
                    description:  modelObj["i18n"]("cdd_timedActionTrigger_endpointTitle_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                storedRatio: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_storedRatio_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_storedRatio_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                storedInfoType: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_storedInfoType_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_storedInfoType_d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                storageDescription: {
                    title: modelObj["i18n"]("cdd_timedActionTrigger_storageDescription_t"),
                    description: modelObj["i18n"]("cdd_timedActionTrigger_storageDescription_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },                
                "additionalProperties": false

            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/passThroughRatioTypeOfTraffic.json",
        schema: {
            title: modelObj["i18n"]("cdd_passThroughRatioTraffic_t"),
            description: modelObj["i18n"]("cdd_passThroughRatioTraffic_d"),
            type: "object",
            required: ["type", "description","infoType", "ports", "internet","restriction","source", "end","passThroughReqRatio","compositResRatio","endpointTitle","storedRatio"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_type_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_type_d"),
                    type: "string",
                    enum: ["passThroughRatio"]
                },
                description: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_description_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_description_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                infoType: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_infoType_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_infoType_d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                ports: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_ports_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_ports_d"),                    
                    type: "array",
                    items: {
                        type: "integer"
                    }
                },
                internet: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_internet_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_internet_d"),                    
                    type: "boolean"
                },
                restriction: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_restriction_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_restriction_d"),                    
                    type: "boolean"
                },
                source: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_source_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_source_d"),
                    type: "object",
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToTrigger.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToTraffic.json"}
                    ]
                },
                end: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_end_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_end_d"),
                    type: "array",
                    items: {
                        anyOf: [
                            { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToActor.json"},
                            { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToResources.json"}
                        ]
                    }
                },
                passThroughReqRatio: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_passThroughReqRatio_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_passThroughReqRatio_d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                compositResRatio: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_compositResRatio_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_compositResRatio_d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                endpointTitle: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_endpointTitle_t"),
                    description:  modelObj["i18n"]("cdd_passThroughRatioTraffic_endpointTitle_d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                storedRatio: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_storedRatio_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_storedRatio_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                storedInfoType: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_storedInfoType_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_storedInfoType_d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                storageDescription: {
                    title: modelObj["i18n"]("cdd_passThroughRatioTraffic_storageDescription_t"),
                    description: modelObj["i18n"]("cdd_passThroughRatioTraffic_storageDescription_d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },             
                "additionalProperties": false
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/rangeValue.json",
        schema: {     
            title: modelObj["i18n"]("cdd_rangeValue_t"),
            description: modelObj["i18n"]("cdd_rangeValue_d"),
            type: "object",
            required: ["max","min"],
            properties: {
                max: {
                    title: modelObj["i18n"]("cdd_rangeValue_max_t"),
                    description: modelObj["i18n"]("cdd_rangeValue_max_d"),
                    type: "number",
                    minimum: 0
                },
                min: {
                    title: modelObj["i18n"]("cdd_rangeValue_min_t"),
                    description: modelObj["i18n"]("cdd_rangeValue_min_d"),
                    type: "number",
                    minimum: 0
                }
            }
        }
    }
    ]




};
/*
var schema=JSON.stringify(model,null,"  ");
console.log(schema);
*/
  return model;
}