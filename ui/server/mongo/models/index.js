const EventMemberSchema = require("./eventMember");
const EventSchema = require("./event");
const DreamSchema = require("./dream");
const GrantSchema = require("./grant");
const AllocationSchema = require("./allocation");
const ContributionSchema = require("./contribution");
const TagSchema = require("./tag");

const {
  db: {
    schemas: { OrganizationSchema, OrgMemberSchema },
  },
} = require("@sensestack/plato-core");

const { createLogModels } = require("./log");

let models = null;
const getModels = (db) => {
  if (models === null)
    models = {
      Organization: db.model("Organization", OrganizationSchema),
      OrgMember: db.model("OrgMember", OrgMemberSchema),
      EventMember: db.model("EventMember", EventMemberSchema),
      Event: db.model("Event", EventSchema),
      Dream: db.model("Dream", DreamSchema),
      Grant: db.model("Grant", GrantSchema),
      Allocation: db.model("Allocation", AllocationSchema),
      Contribution: db.model("Contribution", ContributionSchema),
      Tag: db.model("Tag", TagSchema),
      logs: createLogModels(db),
    };

  return models;
};

module.exports = { getModels };
