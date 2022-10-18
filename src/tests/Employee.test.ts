import Employee from "../models/employee";

/** Note: The employee's never get changes during runtime so there is not a lot of setters to test. */

describe("Employee Class - Setters", () => {
  test("Can set employee role", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Administration Manager"
    );

    expect(testEmployee.role).toEqual("Administration Manager");

    testEmployee.setEmployeeRole("Chef");
    expect(testEmployee.role).toEqual("Chef");
  });

  test("Does not change role if invalid role", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Administration Manager"
    );
    expect(testEmployee.role).toEqual("Administration Manager");

    testEmployee.setEmployeeRole("BatmanRole");
    expect(testEmployee.role).toEqual("Administration Manager");
  });
});

describe("Employee Class - Constructor", () => {
  test("Reverts to default role (Unknown Role) when constructing with invalid role", () => {
    const testInvalidRole = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "InvalidRole"
    );
    expect(testInvalidRole.role).toEqual("Unknown Role");
  });
});

describe("Employee Class - Role Based Access", () => {
  test("Administration Manager privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Administration Manager"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeTruthy();
    expect(testEmployee.canViewEvent()).toBeTruthy();
    expect(testEmployee.canEditEvent()).toBeTruthy();
    expect(testEmployee.canEditEventDetails()).toBeTruthy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeTruthy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeTruthy();
    expect(testEmployee.canRejectEvent()).toBeTruthy();
    expect(testEmployee.canAcceptEvent()).toBeTruthy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeFalsy();
    expect(testEmployee.canCreateFinancialRequest()).toBeFalsy();
    expect(testEmployee.canEditFinancialRequest()).toBeFalsy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeFalsy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeFalsy();
    expect(testEmployee.isInProductionTeam()).toBeFalsy();
    expect(testEmployee.isInServicesTeam()).toBeFalsy();
  });

  test("Senior Customer Service Officer privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Senior Customer Service Officer"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeTruthy();
    expect(testEmployee.canViewEvent()).toBeTruthy();
    expect(testEmployee.canEditEvent()).toBeTruthy();
    expect(testEmployee.canEditEventDetails()).toBeTruthy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeTruthy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeFalsy();
    expect(testEmployee.canRejectEvent()).toBeTruthy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeFalsy();
    expect(testEmployee.canCreateFinancialRequest()).toBeFalsy();
    expect(testEmployee.canEditFinancialRequest()).toBeFalsy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeFalsy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeFalsy();
    expect(testEmployee.isInProductionTeam()).toBeFalsy();
    expect(testEmployee.isInServicesTeam()).toBeFalsy();
  });

  test("Customer Service Officer privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Customer Service Officer"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeTruthy();
    expect(testEmployee.canViewEvent()).toBeTruthy();
    expect(testEmployee.canEditEvent()).toBeFalsy(); // this refers to editing an already created event plan
    expect(testEmployee.canEditEventDetails()).toBeTruthy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeFalsy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeFalsy();
    expect(testEmployee.canRejectEvent()).toBeFalsy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeFalsy();
    expect(testEmployee.canCreateFinancialRequest()).toBeFalsy();
    expect(testEmployee.canEditFinancialRequest()).toBeFalsy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeFalsy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeFalsy();
    expect(testEmployee.isInProductionTeam()).toBeFalsy();
    expect(testEmployee.isInServicesTeam()).toBeFalsy();
  });

  test("Financial Manager privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Financial Manager"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeFalsy();
    expect(testEmployee.canViewEvent()).toBeTruthy();
    expect(testEmployee.canEditEvent()).toBeTruthy();
    expect(testEmployee.canEditEventDetails()).toBeFalsy();
    expect(testEmployee.canAddFinancialComments()).toBeTruthy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeTruthy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeTruthy();
    expect(testEmployee.canRejectEvent()).toBeFalsy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeTruthy();
    expect(testEmployee.canCreateFinancialRequest()).toBeFalsy();
    expect(testEmployee.canEditFinancialRequest()).toBeTruthy();
    expect(testEmployee.canProcessFinancialRequest()).toBeTruthy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeFalsy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeFalsy();
    expect(testEmployee.isInProductionTeam()).toBeFalsy();
    expect(testEmployee.isInServicesTeam()).toBeFalsy();
  });

  test("Human Resources privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Human Resources"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeFalsy();
    expect(testEmployee.canViewEvent()).toBeFalsy();
    expect(testEmployee.canEditEvent()).toBeFalsy();
    expect(testEmployee.canEditEventDetails()).toBeFalsy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeFalsy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeFalsy();
    expect(testEmployee.canRejectEvent()).toBeFalsy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeFalsy();
    expect(testEmployee.canCreateFinancialRequest()).toBeFalsy();
    expect(testEmployee.canEditFinancialRequest()).toBeFalsy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeTruthy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeTruthy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeTruthy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeFalsy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeFalsy();
    expect(testEmployee.isInProductionTeam()).toBeFalsy();
    expect(testEmployee.isInServicesTeam()).toBeFalsy();
  });

  test("Service Manager privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Service Manager"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeFalsy();
    expect(testEmployee.canViewEvent()).toBeTruthy();
    expect(testEmployee.canEditEvent()).toBeFalsy();
    expect(testEmployee.canEditEventDetails()).toBeFalsy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeFalsy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeFalsy();
    expect(testEmployee.canRejectEvent()).toBeFalsy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeTruthy();
    expect(testEmployee.canCreateFinancialRequest()).toBeTruthy();
    expect(testEmployee.canEditFinancialRequest()).toBeTruthy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeTruthy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeTruthy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeTruthy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeTruthy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeFalsy();
    expect(testEmployee.isInProductionTeam()).toBeFalsy();
    expect(testEmployee.isInServicesTeam()).toBeTruthy();
  });

  test("Production Manager privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Production Manager"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeFalsy();
    expect(testEmployee.canViewEvent()).toBeTruthy();
    expect(testEmployee.canEditEvent()).toBeFalsy();
    expect(testEmployee.canEditEventDetails()).toBeFalsy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeFalsy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeFalsy();
    expect(testEmployee.canRejectEvent()).toBeFalsy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeTruthy();
    expect(testEmployee.canCreateFinancialRequest()).toBeTruthy();
    expect(testEmployee.canEditFinancialRequest()).toBeTruthy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeTruthy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeTruthy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeTruthy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeTruthy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeFalsy();
    expect(testEmployee.isInProductionTeam()).toBeTruthy();
    expect(testEmployee.isInServicesTeam()).toBeFalsy();
  });

  test("Decorating Architect privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Decorating Architect"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeFalsy();
    expect(testEmployee.canViewEvent()).toBeFalsy();
    expect(testEmployee.canEditEvent()).toBeFalsy();
    expect(testEmployee.canEditEventDetails()).toBeFalsy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeFalsy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeFalsy();
    expect(testEmployee.canRejectEvent()).toBeFalsy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeFalsy();
    expect(testEmployee.canCreateFinancialRequest()).toBeFalsy();
    expect(testEmployee.canEditFinancialRequest()).toBeFalsy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeFalsy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeTruthy();
    expect(testEmployee.isInProductionTeam()).toBeTruthy();
    expect(testEmployee.isInServicesTeam()).toBeFalsy();
  });

  test("Decorating Specialist privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Decorating Specialist"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeFalsy();
    expect(testEmployee.canViewEvent()).toBeFalsy();
    expect(testEmployee.canEditEvent()).toBeFalsy();
    expect(testEmployee.canEditEventDetails()).toBeFalsy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeFalsy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeFalsy();
    expect(testEmployee.canRejectEvent()).toBeFalsy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeFalsy();
    expect(testEmployee.canCreateFinancialRequest()).toBeFalsy();
    expect(testEmployee.canEditFinancialRequest()).toBeFalsy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeFalsy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeTruthy();
    expect(testEmployee.isInProductionTeam()).toBeTruthy();
    expect(testEmployee.isInServicesTeam()).toBeFalsy();
  });

  test("Assistant privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Assistant"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeFalsy();
    expect(testEmployee.canViewEvent()).toBeFalsy();
    expect(testEmployee.canEditEvent()).toBeFalsy();
    expect(testEmployee.canEditEventDetails()).toBeFalsy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeFalsy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeFalsy();
    expect(testEmployee.canRejectEvent()).toBeFalsy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeFalsy();
    expect(testEmployee.canCreateFinancialRequest()).toBeFalsy();
    expect(testEmployee.canEditFinancialRequest()).toBeFalsy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeFalsy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeTruthy();
    expect(testEmployee.isInProductionTeam()).toBeTruthy();
    expect(testEmployee.isInServicesTeam()).toBeFalsy();
  });

  test("Top Chef privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Top Chef"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeFalsy();
    expect(testEmployee.canViewEvent()).toBeFalsy();
    expect(testEmployee.canEditEvent()).toBeFalsy();
    expect(testEmployee.canEditEventDetails()).toBeFalsy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeFalsy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeFalsy();
    expect(testEmployee.canRejectEvent()).toBeFalsy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeFalsy();
    expect(testEmployee.canCreateFinancialRequest()).toBeFalsy();
    expect(testEmployee.canEditFinancialRequest()).toBeFalsy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeFalsy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeTruthy();
    expect(testEmployee.isInProductionTeam()).toBeFalsy();
    expect(testEmployee.isInServicesTeam()).toBeTruthy();
  });

  test("Chef privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Chef"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeFalsy();
    expect(testEmployee.canViewEvent()).toBeFalsy();
    expect(testEmployee.canEditEvent()).toBeFalsy();
    expect(testEmployee.canEditEventDetails()).toBeFalsy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeFalsy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeFalsy();
    expect(testEmployee.canRejectEvent()).toBeFalsy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeFalsy();
    expect(testEmployee.canCreateFinancialRequest()).toBeFalsy();
    expect(testEmployee.canEditFinancialRequest()).toBeFalsy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeFalsy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeTruthy();
    expect(testEmployee.isInProductionTeam()).toBeFalsy();
    expect(testEmployee.isInServicesTeam()).toBeTruthy();
  });

  test("Unknown Role privileges", () => {
    const testEmployee = new Employee(
      "testname",
      "test@test.com",
      "p@ssword",
      "Unknown Role"
    );

    /** Event-related privileges  */
    expect(testEmployee.canCreateEvent()).toBeFalsy();
    expect(testEmployee.canViewEvent()).toBeFalsy();
    expect(testEmployee.canEditEvent()).toBeFalsy();
    expect(testEmployee.canEditEventDetails()).toBeFalsy();
    expect(testEmployee.canAddFinancialComments()).toBeFalsy();
    expect(testEmployee.canRedirectToFinancialManager()).toBeFalsy();
    expect(testEmployee.canRedirectToAdministrationManager()).toBeFalsy();
    expect(testEmployee.canRejectEvent()).toBeFalsy();
    expect(testEmployee.canAcceptEvent()).toBeFalsy();

    /** Financial-related privileges */
    expect(testEmployee.canViewFinancialRequest()).toBeFalsy();
    expect(testEmployee.canCreateFinancialRequest()).toBeFalsy();
    expect(testEmployee.canEditFinancialRequest()).toBeFalsy();
    expect(testEmployee.canProcessFinancialRequest()).toBeFalsy();

    /** Recruitment-related privileges */
    expect(testEmployee.canViewRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canCreateRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canEditRecruitmentRequest()).toBeFalsy();
    expect(testEmployee.canProcessRecruitmentRequest()).toBeFalsy();

    /** Task-related privileges */
    expect(testEmployee.canCreateDepartmentTasks()).toBeFalsy();
    expect(testEmployee.isInSubteamAndNotManager()).toBeFalsy();
    expect(testEmployee.isInProductionTeam()).toBeFalsy();
    expect(testEmployee.isInServicesTeam()).toBeFalsy();
  });
});
