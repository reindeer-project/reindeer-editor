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
            title: modelObj["i18n"]("cdd.t"),
            description: modelObj["i18n"]("cdd.d"),
            type: "object",
            required: ["reindeer","self","info","actors","resources","contexts"],
            properties: {
                reindeer: {
                    title: modelObj["i18n"]("cdd.reindeer.t"),
                    description: modelObj["i18n"]("cdd.reindeer.d"),
                    type: "string",
                    enum: ["1.1.0"]
                },
                self: {
                    title: modelObj["i18n"]("cdd.self.t"),
                    description: modelObj["i18n"]("cdd.self.d"),
                    type: "string",
                    default: "cloudDesign.json",
                    pattern: "^[a-zA-Z0-9]+\\.(yaml|yml|json)$"
                },
                info: {
                    title: modelObj["i18n"]("cdd.info.t"),
                    description: modelObj["i18n"]("cdd.info.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/info.json"
                },
                actors: {
                    title: modelObj["i18n"]("cdd.actors.t"),
                    description: modelObj["i18n"]("cdd.actors.d"),
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
                    title: modelObj["i18n"]("cdd.resources.t"),
                    description: modelObj["i18n"]("cdd.resources.d"),
                    type: "array",
                    items:{
                        type: "object", 
                        $ref: "https://reindeer.tech/cdd-schema/v1/resource.json"
                    },
                    additionalProperties: false 
                },
                contexts: {
                    title: modelObj["i18n"]("cdd.contexts.t"),
                    description:  modelObj["i18n"]("cdd.contexts.d"),
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
                    title: modelObj["i18n"]("cdd.components.t"),
                    description:  modelObj["i18n"]("cdd.components.d"),
                    type: "object",
                    properties:{
                        actors: {
                            title: modelObj["i18n"]("cdd.components.actors.t"),
                            description:  modelObj["i18n"]("cdd.components.actors.d"),
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
                            title: modelObj["i18n"]("cdd.components.contexts.t"),
                            description:  modelObj["i18n"]("cdd.components.contexts.d"),
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
                            title: modelObj["i18n"]("cdd.components.markets.t"),
                            description:  modelObj["i18n"]("cdd.components.markets.d"),
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
                            title: modelObj["i18n"]("cdd.components.triggers.t"),
                            description:  modelObj["i18n"]("cdd.components.triggers.d"),
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
                            title: modelObj["i18n"]("cdd.components.traffics.t"),
                            description:  modelObj["i18n"]("cdd.components.traffics.d"),
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
                            title: modelObj["i18n"]("cdd.components.infoTypes.t"),
                            description:  modelObj["i18n"]("cdd.components.infoTypes.d"),
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
            title: modelObj["i18n"]("cdd.infoObj.t"),
            description:  modelObj["i18n"]("cdd.infoObj.d"),
            type: "object",
            required: ["version", "license", "title", "description", "status", "designedAt", "authors"],
            properties: {
                version: {
                    title: modelObj["i18n"]("cdd.infoObj.version.t"),
                    description:  modelObj["i18n"]("cdd.infoObj.version.d"),
                    default: "1.0.0",
                    type: "string"
                },
                license: {
                    title: modelObj["i18n"]("cdd.infoObj.license.t"),
                    description:  modelObj["i18n"]("cdd.infoObj.license.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/license.json"
                },
                title: {
                    title: modelObj["i18n"]("cdd.infoObj.title.t"),
                    description:  modelObj["i18n"]("cdd.infoObj.title.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd.infoObj.description.t"),
                    description:  modelObj["i18n"]("cdd.infoObj.description.d"),
                    type:"object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                status: {
                    title: modelObj["i18n"]("cdd.infoObj.status.t"),
                    description:  modelObj["i18n"]("cdd.infoObj.status.d"),
                    type: "string",
                    enum: ["idea","draft","production"]
                },
                designedAt: {
                    title: modelObj["i18n"]("cdd.infoObj.designedAt.t"),
                    description:  modelObj["i18n"]("cdd.infoObj.designedAt.d"),
                    type: "integer",
                    minimum: 1
                },
                authors: {
                    title: modelObj["i18n"]("cdd.infoObj.authors.t"),
                    description:  modelObj["i18n"]("cdd.infoObj.authors.d"),
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
                    title: modelObj["i18n"]("cdd.infoObj.organizations.t"),
                    description:  modelObj["i18n"]("cdd.infoObj.organizations.d"),
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
            title: modelObj["i18n"]("cdd.marketActorObj.t"),
            description:  modelObj["i18n"]("cdd.marketActorObj.d"),
            type: "object",
            required: ["type", "title", "description", "market", "marketShare", "sourceIdentification"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd.marketActorObj.type.t"),
                    description:  modelObj["i18n"]("cdd.marketActorObj.type.d"),
                    type: "string",
                    enum: ["market"]
                },
                title: {
                    title: modelObj["i18n"]("cdd.marketActorObj.title.t"),
                    description:  modelObj["i18n"]("cdd.marketActorObj.title.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd.marketActorObj.description.t"),
                    description:  modelObj["i18n"]("cdd.marketActorObj.description.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                market: {
                    title: modelObj["i18n"]("cdd.marketActorObj.market.t"),
                    description:  modelObj["i18n"]("cdd.marketActorObj.market.d"),
                    type: "object",
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/market.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToMarket.json"}
                    ]
                },
                marketShare: {
                    title: modelObj["i18n"]("cdd.marketActorObj.marketShare.t"),
                    description:  modelObj["i18n"]("cdd.marketActorObj.marketShare.d"), 
                    type: "number",
                    minimum: 0,
                    maximum: 1
                },
                sourceIdentification:{
                    title: modelObj["i18n"]("cdd.marketActorObj.sourceIdentification.t"),
                    description:  modelObj["i18n"]("cdd.marketActorObj.sourceIdentification.d"),
                    type: "boolean",
                },
                identificationGroup: {
                    title: modelObj["i18n"]("cdd.marketActorObj.identificationGroup.t"),
                    description:  modelObj["i18n"]("cdd.marketActorObj.identificationGroup.d"),
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
            title: modelObj["i18n"]("cdd.personsActorObj.t"),
            description:  modelObj["i18n"]("cdd.personsActorObj.d"),
            type: "object",
            required: ["type", "title", "description", "num", "sourceIdentification"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd.personsActorObj.type.t"),
                    description:  modelObj["i18n"]("cdd.personsActorObj.type.d"),
                    type: "string",
                    enum: ["persons"]
                },
                title: {
                    title: modelObj["i18n"]("cdd.personsActorObj.title.t"),
                    description:  modelObj["i18n"]("cdd.personsActorObj.title.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd.personsActorObj.description.t"),
                    description:  modelObj["i18n"]("cdd.personsActorObj.description.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                num: {
                    title: modelObj["i18n"]("cdd.personsActorObj.num.t"),
                    description:  modelObj["i18n"]("cdd.personsActorObj.num.d"),
                    type: "integer",
                    minimum: 1
                },
                sourceIdentification:{
                    title: modelObj["i18n"]("cdd.marketActorObj.sourceIdentification.t"),
                    description:  modelObj["i18n"]("cdd.marketActorObj.sourceIdentification.d"),
                    type: "boolean",
                },
                identificationGroup: {
                    title: modelObj["i18n"]("cdd.personsActorObj.identificationGroup.t"),
                    description:  modelObj["i18n"]("cdd.personsActorObj.identificationGroup.d"),
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
            title: modelObj["i18n"]("cdd.externalSystemActorObj.t"),
            description:  modelObj["i18n"]("cdd.externalSystemActorObj.d"),
            type: "object",
            required: ["type", "title", "description",  "sourceIdentification"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd.externalSystemActorObj.type.t"),
                    description:  modelObj["i18n"]("cdd.externalSystemActorObj.type.d"),
                    type: "string",
                    enum: ["externalSystem"]
                },
                title: {
                    title: modelObj["i18n"]("cdd.externalSystemActorObj.title.t"),
                    description:  modelObj["i18n"]("cdd.externalSystemActorObj.title.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd.externalSystemActorObj.description.t"),
                    description:  modelObj["i18n"]("cdd.externalSystemActorObj.description.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                sourceIdentification:{
                    title: modelObj["i18n"]("cdd.marketActorObj.sourceIdentification.t"),
                    description:  modelObj["i18n"]("cdd.marketActorObj.sourceIdentification.d"),
                    type: "boolean",
                },
                identificationGroup: {
                    title: modelObj["i18n"]("cdd.externalSystemActorObj.identificationGroup.t"),
                    description:  modelObj["i18n"]("cdd.externalSystemActorObj.identificationGroup.d"),
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
            title: modelObj["i18n"]("cdd.resource.t"),
            description:  modelObj["i18n"]("cdd.resource.d"),
            type: "object",
            required: ["type","$ref"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd.resource.type.t"),
                    description:  modelObj["i18n"]("cdd.resource.type.d"),
                    type: "string",
                    enum: ["acf","arm","gdm","aro","oth"]
                },
                $ref: {
                    title: modelObj["i18n"]("cdd.resource.ref.t"),
                    description:  modelObj["i18n"]("cdd.resource.ref.d"),
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
            title: modelObj["i18n"]("cdd.context.t"),
            description:  modelObj["i18n"]("cdd.context.d"),            
            type: "object",
            required: ["title", "description", "trigger",  "traffics"],
            properties: {
                title: {
                    title: modelObj["i18n"]("cdd.context.title.t"),
                    description:  modelObj["i18n"]("cdd.context.title.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd.context.description.t"),
                    description:  modelObj["i18n"]("cdd.context.description.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                trigger: {
                    title: modelObj["i18n"]("cdd.context.trigger.t"),
                    description:  modelObj["i18n"]("cdd.context.trigger.d"),
                    type: "object",
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/webAccessTypeOfTrigger.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/timedActionTypeOfTrigger.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToTrigger.json"}
                    ]      
                },
                traffics: {
                    title: modelObj["i18n"]("cdd.context.traffics.t"),
                    description:  modelObj["i18n"]("cdd.context.traffics.d"),
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
            title: modelObj["i18n"]("cdd.license.t"),
            description:  modelObj["i18n"]("cdd.license.d"),             
            type: "object",
            required: ["type"],
            if: { properties:{ type: { enum:["Closed","OtherOpen"] }}},
            then: { required:["provider"]},
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd.license.type.t"),
                    description:  modelObj["i18n"]("cdd.license.type.d"),
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
                    title: modelObj["i18n"]("cdd.license.provider.t"),
                    description:  modelObj["i18n"]("cdd.license.provider.d"),
                    type: "string"
                }
            },
            additionalProperties: false 
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/author.json",
        schema: {
            title: modelObj["i18n"]("cdd.author.t"),
            description:  modelObj["i18n"]("cdd.author.d"),
            type: "object",
            required: ["roles","joinedAt"],
            properties: {
                roles: {
                    title: modelObj["i18n"]("cdd.author.roles.t"),
                    description:  modelObj["i18n"]("cdd.author.roles.d"),
                    type: "array",
                    items: {
                        type: "string",
                        enum: ["planner","designer","auditor","operator","others"]
                    }
                },
                joinedAt: {
                    title: modelObj["i18n"]("cdd.author.joinedAt.t"),
                    description:  modelObj["i18n"]("cdd.author.joinedAt.d"),
                    type: "integer",
                    minimum: 1
                },
                leavedAt: {
                    title: modelObj["i18n"]("cdd.author.leavedAt.t"),
                    description: modelObj["i18n"]("cdd.author.leavedAt.d"),
                    type: "integer",
                    minimum: 1
                },
                sign: {
                    title: modelObj["i18n"]("cdd.author.sign.t"),
                    description: modelObj["i18n"]("cdd.author.sign.d"),
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
            title: modelObj["i18n"]("cdd.organization.t"),
            description:  modelObj["i18n"]("cdd.organization.d"),
            type: "object",
            required: ["joinedAt"],
            properties: {
                joinedAt: {
                    title: modelObj["i18n"]("cdd.organization.joinedAt.t"),
                    description:  modelObj["i18n"]("cdd.organization.joinedAt.d"),
                    type: "integer",
                    minimum: 1
                },
                leavedAt: {
                    title: modelObj["i18n"]("cdd.organization.leavedAt.t"),
                    description: modelObj["i18n"]("cdd.organization.leavedAt.d"),
                    type: "integer",
                    minimum: 1
                },
                sign: {
                    title: modelObj["i18n"]("cdd.organization.sign.t"),
                    description: modelObj["i18n"]("cdd.organization.sign.d"),
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
            title: modelObj["i18n"]("cdd.market.t"),
            description: modelObj["i18n"]("cdd.market.d"),
            type: "object",
            required: ["title", "description", "num", "estimatedBy", "estimatedAt"],
            properties: {
                title: {
                    title: modelObj["i18n"]("cdd.market.title.t"),
                    description: modelObj["i18n"]("cdd.market.title.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd.market.description.t"),
                    description: modelObj["i18n"]("cdd.market.description.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                num: {
                    title: modelObj["i18n"]("cdd.market.num.t"),
                    description: modelObj["i18n"]("cdd.market.num.d"),
                    type: "integer",
                    minimum: 1
                },
                estimatedBy: {
                    title: modelObj["i18n"]("cdd.market.estimatedBy.t"),
                    description: modelObj["i18n"]("cdd.market.estimatedBy.d"),
                    type: "string"
                },
                estimatedAt: {
                    title: modelObj["i18n"]("cdd.market.estimatedAt.t"),
                    description: modelObj["i18n"]("cdd.market.estimatedAt.d"),                    
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
            title: modelObj["i18n"]("cdd.infoType.t"),
            description: modelObj["i18n"]("cdd.infoType.d"),
            type: "object",
            required: ["title", "description", "confidential", "privacy", "definedBy","definedAt"],
            properties: {
                title: {
                    title: modelObj["i18n"]("cdd.infoType.title.t"),
                    description: modelObj["i18n"]("cdd.infoType.title.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                description: {
                    title: modelObj["i18n"]("cdd.infoType.description.t"),
                    description: modelObj["i18n"]("cdd.infoType.description.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                confidential: {
                    title: modelObj["i18n"]("cdd.infoType.confidential.t"),
                    description: modelObj["i18n"]("cdd.infoType.confidential.d"),
                    type: "boolean"
                },
                privacy: {
                    title: modelObj["i18n"]("cdd.infoType.privacy.t"),
                    description: modelObj["i18n"]("cdd.infoType.privacy.d"),                    
                    type: "boolean"
                },
                definedBy: {
                    title: modelObj["i18n"]("cdd.infoType.definedBy.t"),
                    description: modelObj["i18n"]("cdd.infoType.definedBy.d"),
                    type: "string"
                },
                definedAt: {
                    title: modelObj["i18n"]("cdd.infoType.definedAt.t"),
                    description: modelObj["i18n"]("cdd.infoType.definedAt.d"),                    
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
            title: modelObj["i18n"]("cdd.reference.t"),
            description: modelObj["i18n"]("cdd.reference.d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd.reference.ref.t"),
                    description: modelObj["i18n"]("cdd.reference.ref.d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+(\/components\/actors|\/actors)+\/[a-zA-Z0-9]+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToResources.json",
        schema: {
            title: modelObj["i18n"]("cdd.reference.t"),
            description: modelObj["i18n"]("cdd.reference.d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd.reference.ref.t"),
                    description: modelObj["i18n"]("cdd.reference.ref.d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+\/+.+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToContext.json",
        schema: {
            title: modelObj["i18n"]("cdd.reference.t"),
            description: modelObj["i18n"]("cdd.reference.d"),   
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd.reference.ref.t"),
                    description: modelObj["i18n"]("cdd.reference.ref.d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+\/components\/contexts\/[a-zA-Z0-9]+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToTrigger.json",
        schema: {    
            title: modelObj["i18n"]("cdd.reference.t"),
            description: modelObj["i18n"]("cdd.reference.d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd.reference.ref.t"),
                    description: modelObj["i18n"]("cdd.reference.ref.d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+(\/components\/triggers\/+([a-zA-Z0-9])|\/contexts\/+([a-zA-Z0-9])+\/trigger)+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToTraffic.json",
        schema: {     
            title: modelObj["i18n"]("cdd.reference.t"),
            description: modelObj["i18n"]("cdd.reference.d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd.reference.ref.t"),
                    description: modelObj["i18n"]("cdd.reference.ref.d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+(\/components\/traffics|\/contexts\/+([a-zA-Z0-9])+\/traffics)+\/[a-zA-Z0-9]+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json",
        schema: {     
            title: modelObj["i18n"]("cdd.reference.t"),
            description: modelObj["i18n"]("cdd.reference.d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd.reference.ref.t"),
                    description: modelObj["i18n"]("cdd.reference.ref.d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+\/components\/infoTypes\/[a-zA-Z0-9]+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/refToMarket.json",
        schema: {     
            title: modelObj["i18n"]("cdd.reference.t"),
            description: modelObj["i18n"]("cdd.reference.d"),
            type: "object",
            required: ["$ref"],
            properties: {
                $ref: {
                    title: modelObj["i18n"]("cdd.reference.ref.t"),
                    description: modelObj["i18n"]("cdd.reference.ref.d"),
                    type: "string",
                    pattern: "^([a-zA-Z0-9]+\.+(yaml|yml|json)+\#|\#)+\/components\/markets\/[a-zA-Z0-9]+$"
                }
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/webAccessTypeOfTrigger.json",
        schema: {
            title: modelObj["i18n"]("cdd.webAccessTrigger.t"),
            description: modelObj["i18n"]("cdd.webAccessTrigger.d"),
            type: "object",
            required: ["type", "description","infoType", "ports", "internet","restriction","dau", "pagesVisit","kbPage","reqPage","busyHours","postsVisit","kbPost","start","end","endpointTitle","storedRatio"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.type.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.type.d"),
                    type: "string",
                    enum: ["webAccess"]
                },
                description: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.description.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.description.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                infoType: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.infoType.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.infoType.d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                ports: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.ports.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.ports.d"),                    
                    type: "array",
                    items: {
                        type: "integer"
                    }
                },
                internet: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.internet.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.internet.d"),                    
                    type: "boolean"
                },
                restriction: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.restriction.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.restriction.d"),                    
                    type: "boolean"
                },
                dau: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.dau.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.dau.d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                pagesVisit: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.pagesVisit.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.pagesVisit.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                kbPage: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.kbPage.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.kbPage.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                reqPage: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.reqPage.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.reqPage.d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                busyHours: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.busyHours.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.busyHours.d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                postsVisit: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.postsVisit.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.postsVisit.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                kbPost: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.kbPost.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.kbPost.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                start: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.start.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.start.d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToActor.json"}
                    ]
                },
                end: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.end.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.end.d"),
                    type: "array",
                    items: {
                        type: "object", 
                        $ref: "https://reindeer.tech/cdd-schema/v1/refToResources.json"
                    }
                },
                endpointTitle: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.endpointTitle.t"),
                    description:  modelObj["i18n"]("cdd.webAccessTrigger.endpointTitle.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                storedRatio: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.storedRatio.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.storedRatio.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                storedInfoType: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.storedInfoType.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.storedInfoType.d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                storageDescription: {
                    title: modelObj["i18n"]("cdd.webAccessTrigger.storageDescription.t"),
                    description: modelObj["i18n"]("cdd.webAccessTrigger.storageDescription.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                "additionalProperties": false
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/timedActionTypeOfTrigger.json",
        schema: {     
            title: modelObj["i18n"]("cdd.timedActionTrigger.t"),
            description: modelObj["i18n"]("cdd.timedActionTrigger.d"),
            type: "object",
            required: ["type", "description","infoType", "ports", "internet","restriction","onlineRps", "reqMonth","kbRequest","kbResponse","start","end","endpointTitle","storedRatio"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.type.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.type.d"),
                    type: "string",
                    enum: ["timedAction"]
                },
                description: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.description.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.description.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                infoType: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.infoType.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.infoType.d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                ports: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.ports.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.ports.d"),                    
                    type: "array",
                    items: {
                        type: "integer"
                    }
                },
                internet: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.internet.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.internet.d"),                    
                    type: "boolean"
                },
                restriction: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.restriction.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.restriction.d"),                    
                    type: "boolean"
                },
                onlineRps: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.onlineRps.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.onlineRps.d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                reqMonth: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.reqMonth.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.reqMonth.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                kbRequest: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.kbRequest.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.kbRequest.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                kbResponse: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.kbResponse.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.kbResponse.d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                start: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.start.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.start.d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToActor.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToResources.json"}
                    ]
                },
                end: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.end.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.end.d"),
                    type: "array",
                    items: {
                        anyOf: [
                            { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToActor.json"},
                            { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToResources.json"}
                        ]
                    }
                },
                endpointTitle: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.endpointTitle.t"),
                    description:  modelObj["i18n"]("cdd.timedActionTrigger.endpointTitle.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                storedRatio: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.storedRatio.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.storedRatio.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                storedInfoType: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.storedInfoType.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.storedInfoType.d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                storageDescription: {
                    title: modelObj["i18n"]("cdd.timedActionTrigger.storageDescription.t"),
                    description: modelObj["i18n"]("cdd.timedActionTrigger.storageDescription.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },                
                "additionalProperties": false

            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/passThroughRatioTypeOfTraffic.json",
        schema: {
            title: modelObj["i18n"]("cdd.passThroughRatioTraffic.t"),
            description: modelObj["i18n"]("cdd.passThroughRatioTraffic.d"),
            type: "object",
            required: ["type", "description","infoType", "ports", "internet","restriction","source", "end","passThroughReqRatio","compositResRatio","endpointTitle","storedRatio"],
            properties: {
                type: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.type.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.type.d"),
                    type: "string",
                    enum: ["passThroughRatio"]
                },
                description: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.description.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.description.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },
                infoType: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.infoType.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.infoType.d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                ports: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.ports.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.ports.d"),                    
                    type: "array",
                    items: {
                        type: "integer"
                    }
                },
                internet: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.internet.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.internet.d"),                    
                    type: "boolean"
                },
                restriction: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.restriction.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.restriction.d"),                    
                    type: "boolean"
                },
                source: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.source.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.source.d"),
                    type: "object",
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToTrigger.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToTraffic.json"}
                    ]
                },
                end: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.end.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.end.d"),
                    type: "array",
                    items: {
                        anyOf: [
                            { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToActor.json"},
                            { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToResources.json"}
                        ]
                    }
                },
                passThroughReqRatio: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.passThroughReqRatio.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.passThroughReqRatio.d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                compositResRatio: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.compositResRatio.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.compositResRatio.d"),                    
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                endpointTitle: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.endpointTitle.t"),
                    description:  modelObj["i18n"]("cdd.passThroughRatioTraffic.endpointTitle.d"),
                    type: "object",
                    $ref: "https://reindeer.tech/cdd-schema/v1/title.json"
                },
                storedRatio: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.storedRatio.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.storedRatio.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/rangeValue.json"
                },
                storedInfoType: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.storedInfoType.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.storedInfoType.d"),
                    oneOf: [
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/infoType.json"},
                        { type: "object", $ref: "https://reindeer.tech/cdd-schema/v1/refToInfoType.json"}
                    ]
                },
                storageDescription: {
                    title: modelObj["i18n"]("cdd.passThroughRatioTraffic.storageDescription.t"),
                    description: modelObj["i18n"]("cdd.passThroughRatioTraffic.storageDescription.d"),
                    $ref: "https://reindeer.tech/cdd-schema/v1/description.json"
                },             
                "additionalProperties": false
            }
        }
    },
    {
        uri: "https://reindeer.tech/cdd-schema/v1/rangeValue.json",
        schema: {     
            title: modelObj["i18n"]("cdd.rangeValue.t"),
            description: modelObj["i18n"]("cdd.rangeValue.d"),
            type: "object",
            required: ["max","min"],
            properties: {
                max: {
                    title: modelObj["i18n"]("cdd.rangeValue.max.t"),
                    description: modelObj["i18n"]("cdd.rangeValue.max.d"),
                    type: "number",
                    minimum: 0
                },
                min: {
                    title: modelObj["i18n"]("cdd.rangeValue.min.t"),
                    description: modelObj["i18n"]("cdd.rangeValue.min.d"),
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