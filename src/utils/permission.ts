
export const userType = {
  user: 'user',
  superUser: 'superUser',
  admin: 'admin',
  superAdmin: 'superAdmin'
};

export const findRoles = (loggedInRole: any) => {
  let rolesToHide: string[] = [];

  // Determine which roles to hide based on the logged-in role
  switch (loggedInRole) {
    case 'superadmin':
      rolesToHide = ['superadmin'];
      break;
    case 'admin':
      rolesToHide = ['admin', 'superadmin'];
      break;
    case 'superuser':
      rolesToHide = ['superuser', 'admin', 'superadmin'];
      break;
    case 'user':
      rolesToHide = ['user', 'superuser', 'admin', 'superadmin'];
      break;
    // default:
    //   rolesToHide = [];
    //   break;
  }

  return rolesToHide;
};

export const hasPermission = (
  moduleListByRole: any,
  feature: string
): boolean => {
  return (
    moduleListByRole?.moduleListByRole?.some(
      (mod: { moduleName: string; }) => mod?.moduleName === feature
    ) ?? false
  );
};

export const createPermissionEnum = (permissions: any[]) => {
  const enumObject: Record<string, string> = {};

  permissions.forEach((permission) => {
    // Convert permission string to a valid key format (replace spaces and special characters with underscores)
    const formattedKey = permission.moduleName
      .replace(/[^a-zA-Z0-9]/g, '_') // Replace any non-alphanumeric character with underscores
      .replace(/_+/g, '_') // Remove consecutive underscores
      .replace(/_$/g, ''); // Remove trailing underscore

    enumObject[formattedKey] = permission.moduleName;
  });

  return enumObject;
};
