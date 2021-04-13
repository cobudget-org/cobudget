const { gql } = require("apollo-server-express");

const schema = gql`
  scalar JSON
  scalar JSONObject

  type Query {
    currentUser: User
    currentOrgMember: OrgMember
    currentOrg: Organization
    organizations: [Organization!]
    organization(id: ID!): Organization!
    events(limit: Int): [Event!]
    event(slug: String): Event
    dream(id: ID!): Dream
    dreams(eventSlug: String!, textSearchTerm: String): [Dream]
    orgMembers(limit: Int): [OrgMember]
    members(eventId: ID!, isApproved: Boolean): [EventMember]
  }

  type Mutation {
    createOrganization(
      name: String!
      logo: String
      subdomain: String!
    ): Organization!

    editOrganization(
      organizationId: ID!
      name: String!
      logo: String
      subdomain: String!
    ): Organization!
    setTodosFinished: Organization

    createEvent(
      slug: String!
      title: String!
      currency: String!
      description: String
      registrationPolicy: RegistrationPolicy!
    ): Event!
    editEvent(
      eventId: ID!
      slug: String
      title: String
      registrationPolicy: RegistrationPolicy
      info: String
      color: String
      about: String
      dreamReviewIsOpen: Boolean
    ): Event!
    deleteEvent(eventId: ID!): Event

    addGuideline(eventId: ID!, guideline: GuidelineInput!): Event!
    editGuideline(
      eventId: ID!
      guidelineId: ID!
      guideline: GuidelineInput!
    ): Event!
    setGuidelinePosition(
      eventId: ID!
      guidelineId: ID!
      newPosition: Float
    ): Event!
    deleteGuideline(eventId: ID!, guidelineId: ID!): Event!

    addCustomField(eventId: ID!, customField: CustomFieldInput!): Event!
    editCustomField(
      eventId: ID!
      fieldId: ID!
      customField: CustomFieldInput!
    ): Event!
    setCustomFieldPosition(
      eventId: ID!
      fieldId: ID!
      newPosition: Float
    ): Event!
    deleteCustomField(eventId: ID!, fieldId: ID!): Event!

    editDreamCustomField(
      dreamId: ID!
      customField: CustomFieldValueInput!
    ): Dream!

    createDream(
      eventId: ID!
      title: String!
      description: String
      summary: String
      minGoal: Int
      maxGoal: Int
      images: [ImageInput]
      budgetItems: [BudgetItemInput]
    ): Dream
    editDream(
      dreamId: ID!
      title: String
      description: String
      summary: String
      images: [ImageInput]
      budgetItems: [BudgetItemInput]
    ): Dream
    deleteDream(dreamId: ID!): Dream

    addCocreator(dreamId: ID!, memberId: ID!): Dream
    removeCocreator(dreamId: ID!, memberId: ID!): Dream

    publishDream(dreamId: ID!, unpublish: Boolean): Dream

    addComment(dreamId: ID!, content: String!): Dream
    editComment(dreamId: ID!, commentId: ID!, content: String!): Dream
    deleteComment(dreamId: ID!, commentId: ID!): Dream

    raiseFlag(dreamId: ID!, guidelineId: ID!, comment: String!): Dream
    resolveFlag(dreamId: ID!, flagId: ID!, comment: String!): Dream
    allGoodFlag(dreamId: ID!): Dream

    joinOrg: OrgMember

    updateProfile(
      username: String
      firstName: String
      lastName: String
      bio: String
    ): User
    inviteEventMembers(emails: String!, eventId: ID!): [EventMember]
    inviteOrgMembers(emails: String!): [OrgMember]
    updateOrgMember(memberId: ID!, isOrgAdmin: Boolean): OrgMember
    updateMember(
      eventId: ID!
      memberId: ID!
      isApproved: Boolean
      isAdmin: Boolean
      isGuide: Boolean
    ): EventMember
    deleteMember(eventId: ID!, memberId: ID!): EventMember

    deleteOrganization(organizationId: ID!): Organization

    approveForGranting(dreamId: ID!, approved: Boolean!): Dream
    updateGrantingSettings(
      eventId: ID!
      currency: String
      grantsPerMember: Int
      maxGrantsToDream: Int
      totalBudget: Int
      grantValue: Int
      grantingOpens: Date
      grantingCloses: Date
      dreamCreationCloses: Date
      allowStretchGoals: Boolean
    ): Event
    giveGrant(eventId: ID!, dreamId: ID!, value: Int!): Grant
    deleteGrant(eventId: ID!, grantId: ID!): Grant
    reclaimGrants(dreamId: ID!): Dream
    preOrPostFund(dreamId: ID!, value: Int!): Grant
    toggleFavorite(dreamId: ID!): Dream

    allocate(eventMemberId: ID!, amount: Int!): EventMember
    contribute(eventId: ID!, dreamId: ID!, amount: Int!): Dream

    registerForEvent(eventId: ID!): EventMember
  }

  type Organization {
    id: ID!
    name: String!
    subdomain: String
    customDomain: String
    logo: String
    events: [Event]
    discourseUrl: String
    finishedTodos: Boolean
  }

  type Event {
    id: ID!
    slug: String!
    title: String!
    organization: Organization!
    info: String
    color: String
    numberOfApprovedMembers: Int
    dreams: [Dream!]
    # visibility: Visibility
    registrationPolicy: RegistrationPolicy!
    currency: String!
    maxAmountToDreamPerUser: Int
    dreamCreationCloses: Date
    dreamCreationIsOpen: Boolean
    grantingOpens: Date
    grantingCloses: Date
    grantingIsOpen: Boolean
    guidelines: [Guideline]
    about: String
    allowStretchGoals: Boolean
    customFields: [CustomField]
    filterLabels: [CustomFieldFilterLabels]
    dreamReviewIsOpen: Boolean
  }

  type Guideline {
    id: ID!
    title: String!
    description: String!
    position: Float!
  }

  input GuidelineInput {
    title: String!
    description: String!
  }

  scalar Date

  enum RegistrationPolicy {
    OPEN
    REQUEST_TO_JOIN
    INVITE_ONLY
  }

  type User {
    id: ID
    username: String!
    email: String
    name: String
    firstName: String
    lastName: String
    verifiedEmail: Boolean!
    isRootAdmin: Boolean
    orgMemberships: [OrgMember!]
    avatar: String
    createdAt: Date
    currentOrgMember: OrgMember
  }

  type OrgMember {
    id: ID!
    organization: Organization!
    user: User!
    isOrgAdmin: Boolean
    bio: String #what do we do with this one?
    createdAt: Date
    currentEventMembership(slug: String): EventMember #this is weird syntax...
    eventMemberships: [EventMember!]
    discourseUsername: String
    hasDiscourseApiKey: Boolean
  }

  type EventMember {
    id: ID!
    event: Event!
    orgMember: OrgMember!
    isAdmin: Boolean!
    isGuide: Boolean
    isApproved: Boolean!
    createdAt: Date
    availableGrants: Int
    givenGrants: [Grant]
    balance: Int # stored as cents
    # roles: [Role]
  }

  # enum Role {
  #   ADMIN
  #   GUIDE
  # }

  type Dream {
    id: ID!
    event: Event!
    title: String!
    description: String
    summary: String
    images: [Image!]
    cocreators: [EventMember]!
    budgetItems: [BudgetItem!]
    minGoal: Int
    maxGoal: Int
    totalContributions: Int
    customFields: [CustomFieldValue]
    comments: [Comment]
    numberOfComments: Int

    approved: Boolean
    favorite: Boolean
    published: Boolean
    flags: [Flag]
    raisedFlags: [Flag]
    logs: [Log]
    # reactions: [Reaction]
    # tags: [Tag]
  }

  type Comment {
    id: ID!
    orgMember: OrgMember
    createdAt: Date!
    updatedAt: Date
    raw: String
    cooked: String
    discourseUsername: String
    isLog: Boolean
  }

  type Flag {
    id: ID!
    guideline: Guideline
    user: User
    comment: String
    type: String
  }

  type Grant {
    id: ID!
    dream: Dream!
    value: Int!
    reclaimed: Boolean!
    type: GrantType!
    # user: Member!
  }

  enum GrantType {
    PRE_FUND
    USER
    POST_FUND
  }

  type Image {
    small: String
    large: String
  }

  input ImageInput {
    small: String
    large: String
  }

  type BudgetItem {
    description: String!
    min: Int!
    max: Int
    type: BudgetItemType!
  }

  enum BudgetItemType {
    INCOME
    EXPENSE
  }

  input BudgetItemInput {
    description: String!
    min: Int!
    max: Int
    type: BudgetItemType!
  }

  # enum Visibility {
  #   PUBLIC
  #   PRIVATE # only for paid
  #   HIDDEN # only for paid
  # }

  # type GrantingPeriod {
  #   event: Event!
  #   submissionCloses: Date
  #   grantingStarts: Date
  #   grantingCloses: Date # when this happens. all grants to non-funded projects go back into the pool
  #   name: String
  #   budget: Int
  #   distributeGrants: DistributeGrantStrategy
  # }

  # enum DistributeGrantStrategy {
  #   DISTRIBUTE_EQUALLY # is this possible?
  #   DISTRIBUTE_TO_ACTIVE_USERS
  #   COMMITTEE
  # }

  # type Emoji {
  #   unicode: String!
  #   event: Event!
  # }

  # type Reaction {
  #   emoji: Emoji!
  #   by: Member!
  #   # createdAt
  # }

  type CustomFieldValue {
    customField: CustomField
    value: JSON
  }

  input CustomFieldValueInput {
    fieldId: ID!
    eventId: ID!
    value: JSON
  }

  enum CustomFieldType {
    TEXT
    MULTILINE_TEXT
    BOOLEAN
    FILE
  }

  type CustomFieldFilterLabels {
    customField: CustomField
    eventId: ID!
  }

  type CustomField {
    id: ID!
    name: String!
    description: String!
    type: CustomFieldType!
    isRequired: Boolean!
    position: Float!
    isShownOnFrontPage: Boolean
    createdAt: Date!
  }

  input CustomFieldInput {
    name: String!
    description: String!
    type: CustomFieldType!
    isRequired: Boolean!
    isShownOnFrontPage: Boolean
    createdAt: Date
  }

  type Log {
    createdAt: Date
    user: User
    dream: Dream
    event: Event
    details: LogDetails
    type: String
  }

  type FlagRaisedDetails {
    guideline: Guideline
    comment: String
  }

  type FlagResolvedDetails {
    guideline: Guideline
    comment: String
  }

  union LogDetails = FlagRaisedDetails | FlagResolvedDetails

  # type QuestionAnswer {
  #   question: Question
  #   answer: String
  # }

  # type Question {
  #   richtext: String
  #   isRequired: Boolean!
  # }

  # type Image {}
`;

module.exports = schema;
