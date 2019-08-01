import { ForgeRenderingDetails } from '@lcu/elements';

export class ForgeDepartureTableDetails extends ForgeRenderingDetails<ForgeDepartureTableConfig> {
  public Destination: string;

  public DepartureTime: string;

  public IncludeAlts: boolean;

  public Origin: string;

  public ReactToSearch: boolean;

}

export class ForgeDepartureTableConfig {
}
