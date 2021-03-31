import { APIAccessKeyData } from '@lowcodeunit/app-host-common';

export class FathymForecastState {
  public AccessLicenseType?: string;

  public AccessPlanGroup?: string;

  public APIKeys?: APIAccessKeyData[];

  public HasAccess?: boolean;

  public Loading?: boolean;

  public MaxPointQueries?: number;

  public OpenAPISource?: string;

  public UsageState?: UsageStateTypes;

  public UserEnterpriseLookup?: string;
}

export enum UsageStateTypes {
  Active = 'Active',
  Inactive = 'Inactive',
  Overage = 'Overage',
  Revoked = 'Revoked',
  Warning = 'Warning',
}
