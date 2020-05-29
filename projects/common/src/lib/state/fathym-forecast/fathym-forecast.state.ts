import { Status } from '@lcu/common';

export class FathymForecastState {
  public APIKeys?: { [name: string]: string };

  public HasAccess?: boolean;

  public Loading?: boolean;

  public UsageState?: UsageStateTypes;

}

export enum UsageStateTypes {
  Active = "Active",
  Inactive = "Inactive",
  Overage = "Overage",
  Revoked = "Revoked",
  Warning = "Warning",
}
