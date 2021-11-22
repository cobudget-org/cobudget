import { gql } from "apollo-server-micro";

const schema = gql`
  scalar JSON
  scalar JSONObject

  type Query {
    currentUser: User
    currentOrgMember(orgSlug: String): OrgMember
    currentOrg(orgSlug: String): Organization
    organizations: [Organization!]
    organization(id: ID!): Organization!
    collections(orgSlug: String!, limit: Int): [Collection!]
    event(orgSlug: String, collectionSlug: String): Collection
    dream(id: ID!): Dream
    dreamsPage(
      orgSlug: String!
      eventSlug: String!
      textSearchTerm: String
      tag: String
      offset: Int
      limit: Int
    ): DreamsPage
    commentSet(dreamId: ID!, from: Int, limit: Int, order: String): CommentSet!
    orgMembersPage(orgSlug: String!, offset: Int, limit: Int): OrgMembersPage
    membersPage(
      eventId: ID!
      isApproved: Boolean
      offset: Int
      limit: Int
    ): MembersPage
    members(eventId: ID!, isApproved: Boolean): [EventMember]
    categories(orgId: ID!): [Category!]
    contributionsPage(eventId: ID!, offset: Int, limit: Int): ContributionsPage
  }

  type Mutation {
    createOrganization(
      name: String!
      logo: String
      slug: String!
    ): Organization!

    editOrganization(
      organizationId: ID!
      name: String
      info: String
      logo: String
      slug: String
    ): Organization!
    setTodosFinished(orgId: ID!): Organization

    createEvent(
      orgId: ID!
      slug: String!
      title: String!
      currency: String!
      registrationPolicy: RegistrationPolicy!
    ): Collection!
    editEvent(
      orgId: ID!
      eventId: ID!
      slug: String
      title: String
      archived: Boolean
      registrationPolicy: RegistrationPolicy
      info: String
      color: String
      about: String
      bucketReviewIsOpen: Boolean
      discourseCategoryId: Int
    ): Collection!
    deleteCollection(collectionId: ID!): Collection

    addGuideline(eventId: ID!, guideline: GuidelineInput!): Collection!
    editGuideline(
      eventId: ID!
      guidelineId: ID!
      guideline: GuidelineInput!
    ): Collection!
    setGuidelinePosition(
      eventId: ID!
      guidelineId: ID!
      newPosition: Float
    ): Collection!
    deleteGuideline(eventId: ID!, guidelineId: ID!): Collection!

    addCustomField(eventId: ID!, customField: CustomFieldInput!): Collection!
    editCustomField(
      eventId: ID!
      fieldId: ID!
      customField: CustomFieldInput!
    ): Collection!
    setCustomFieldPosition(
      eventId: ID!
      fieldId: ID!
      newPosition: Float
    ): Collection!
    deleteCustomField(eventId: ID!, fieldId: ID!): Collection!

    editDreamCustomField(
      dreamId: ID!
      customField: CustomFieldValueInput!
    ): Dream!

    createDream(eventId: ID!, title: String!): Dream
    editDream(
      dreamId: ID!
      title: String
      description: String
      summary: String
      images: [ImageInput]
      budgetItems: [BudgetItemInput]
      tags: [String!]
    ): Dream
    deleteDream(dreamId: ID!): Dream

    addImage(dreamId: ID!, image: ImageInput!): Dream
    deleteImage(dreamId: ID!, imageId: ID!): Dream

    addCocreator(dreamId: ID!, memberId: ID!): Dream
    removeCocreator(dreamId: ID!, memberId: ID!): Dream

    addTag(dreamId: ID!, tagId: ID, tagValue: String): Dream
    removeTag(dreamId: ID!, tagId: ID!): Dream

    publishDream(dreamId: ID!, unpublish: Boolean): Dream

    addComment(dreamId: ID!, content: String!): Comment
    editComment(dreamId: ID!, commentId: ID!, content: String!): Comment
    deleteComment(dreamId: ID!, commentId: ID!): Comment

    raiseFlag(dreamId: ID!, guidelineId: ID!, comment: String!): Dream
    resolveFlag(dreamId: ID!, flagId: ID!, comment: String!): Dream
    allGoodFlag(dreamId: ID!): Dream

    joinOrg(orgId: ID!): OrgMember

    updateProfile(orgId: ID, username: String, name: String, bio: String): User
    inviteEventMembers(eventId: ID!, emails: String!): [EventMember]
    inviteOrgMembers(orgId: ID!, emails: String!): [OrgMember]
    updateOrgMember(orgId: ID!, memberId: ID!, isOrgAdmin: Boolean): OrgMember
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
      maxAmountToBucketPerUser: Int
      grantingOpens: Date
      grantingCloses: Date
      bucketCreationCloses: Date
      allowStretchGoals: Boolean
    ): Collection

    allocate(
      collectionId: ID!
      collectionMemberId: ID!
      amount: Int!
      type: AllocationType!
    ): EventMember
    bulkAllocate(
      eventId: ID!
      amount: Int!
      type: AllocationType!
    ): [EventMember]
    contribute(eventId: ID!, dreamId: ID!, amount: Int!): Dream

    cancelFunding(dreamId: ID!): Dream
    acceptFunding(dreamId: ID!): Dream
    markAsCompleted(dreamId: ID!): Dream

    registerForEvent(eventId: ID!): EventMember
  }

  type Organization {
    id: ID!
    name: String!
    info: String
    subdomain: String
    slug: String
    customDomain: String
    logo: String
    events: [Collection]
    discourseUrl: String
    finishedTodos: Boolean
  }

  type Collection {
    id: ID!
    slug: String!
    title: String!
    archived: Boolean
    organization: Organization!
    info: String
    color: String
    numberOfApprovedMembers: Int
    # visibility: Visibility
    registrationPolicy: RegistrationPolicy!
    currency: String!
    maxAmountToBucketPerUser: Int
    bucketCreationCloses: Date
    bucketCreationIsOpen: Boolean
    grantingOpens: Date
    grantingCloses: Date
    grantingIsOpen: Boolean
    grantingHasClosed: Boolean
    guidelines: [Guideline]
    about: String
    allowStretchGoals: Boolean
    customFields: [CustomField]
    bucketReviewIsOpen: Boolean
    totalAllocations: Int
    totalContributions: Int
    totalContributionsFunding: Int
    totalContributionsFunded: Int
    totalInMembersBalances: Int
    discourseCategoryId: Int
    tags: [Tag!]
  }

  type Tag {
    id: ID!
    value: String!
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

  enum AllocationType {
    ADD
    SET
  }

  type User {
    id: ID
    username: String
    email: String
    name: String
    verifiedEmail: Boolean!
    isRootAdmin: Boolean
    orgMemberships: [OrgMember!]
    avatar: String
    createdAt: Date
    # currentOrgMember: OrgMember
  }

  type OrgMember {
    id: ID!
    organization: Organization!
    user: User!
    isOrgAdmin: Boolean
    bio: String #what do we do with this one?
    createdAt: Date
    currentEventMembership(collectionSlug: String): EventMember #this is weird syntax...
    eventMemberships: [EventMember!]
    discourseUsername: String
    hasDiscourseApiKey: Boolean
  }

  type OrgMembersPage {
    moreExist: Boolean
    orgMembers: [OrgMember]
  }

  type EventMember {
    id: ID!
    event: Collection!
    orgMember: OrgMember!
    isAdmin: Boolean!
    isGuide: Boolean
    isApproved: Boolean!
    createdAt: Date
    balance: Int # stored as cents
    # roles: [Role]
  }

  type MembersPage {
    moreExist: Boolean
    members(
      eventId: ID!
      isApproved: Boolean
      offset: Int
      limit: Int
    ): [EventMember]
  }

  # enum Role {
  #   ADMIN
  #   GUIDE
  # }

  type Dream {
    id: ID!
    event: Collection!
    title: String!
    description: String
    summary: String
    images: [Image!]
    cocreators: [EventMember]!
    budgetItems: [BudgetItem!]
    customFields: [CustomFieldValue]
    approved: Boolean
    published: Boolean
    flags: [Flag]
    raisedFlags: [Flag]
    # logs: [Log]
    discourseTopicUrl: String
    # reactions: [Reaction]
    tags: [Tag!]
    minGoal: Int
    maxGoal: Int
    income: Int
    totalContributions: Int
    totalContributionsFromCurrentMember: Int
    numberOfComments: Int
    latestContributions: [Contribution!]
    noOfContributions: Int
    fundedAt: Date
    funded: Boolean
    completedAt: Date
    completed: Boolean
    canceledAt: Date
    canceled: Boolean
    collection: Collection!
  }

  type DreamsPage {
    moreExist: Boolean
    dreams: [Dream]
  }

  type Comment {
    id: ID!
    orgMember: OrgMember
    createdAt: Date!
    updatedAt: Date
    isLog: Boolean
    content: String!
    htmlContent: String
  }

  type CommentSet {
    total(dreamId: ID!, order: String): Int
    comments(dreamId: ID!, order: String): [Comment]
  }

  type CommentAction {
    comment: Comment!
    action: String
  }

  type Category {
    id: ID!
    name: String
    color: String
  }

  type Flag {
    id: ID!
    guideline: Guideline
    user: User
    comment: String
    type: String
  }

  type Image {
    id: ID!
    small: String
    large: String
  }

  input ImageInput {
    small: String
    large: String
  }

  type BudgetItem {
    id: ID!
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

  interface Transaction {
    id: ID!
    event: Collection!
    eventMember: EventMember!
    amount: Int!
    createdAt: Date
  }

  type Contribution implements Transaction {
    id: ID!
    event: Collection!
    eventMember: EventMember!
    amount: Int!
    createdAt: Date
    dream: Dream!
  }

  type ContributionsPage {
    moreExist: Boolean
    contributions(eventId: ID!, offset: Int, limit: Int): [Contribution]
  }

  type Allocation implements Transaction {
    id: ID!
    event: Collection!
    eventMember: EventMember!
    amount: Int!
    createdAt: Date
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
    id: ID!
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

  type CustomField {
    id: ID!
    name: String!
    description: String!
    type: CustomFieldType!
    limit: Int
    isRequired: Boolean!
    position: Float!
    createdAt: Date!
  }

  input CustomFieldInput {
    name: String!
    description: String!
    type: CustomFieldType!
    limit: Int
    isRequired: Boolean!
    createdAt: Date
  }

  # type Log {
  #   createdAt: Date
  #   user: User
  #   dream: Dream
  #   event: Collection
  #   details: LogDetails
  #   type: String
  # }

  # type FlagRaisedDetails {
  #   guideline: Guideline
  #   comment: String
  # }

  # type FlagResolvedDetails {
  #   guideline: Guideline
  #   comment: String
  # }

  type Subscription {
    commentsChanged(dreamId: ID!): CommentAction!
  }

  # union LogDetails = FlagRaisedDetails | FlagResolvedDetails

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

export default schema;
