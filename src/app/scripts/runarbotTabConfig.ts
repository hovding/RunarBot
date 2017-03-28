import {TeamsTheme} from './theme';

/**
 * Implementation of runarbot Tab configuration page
 */
export class runarbotTabConfigure {
    constructor() {
        microsoftTeams.initialize();
        TeamsTheme.fix();
        microsoftTeams.settings.registerOnSaveHandler(function (saveEvent: any) {

            var val:any = document.getElementById("data");
            microsoftTeams.settings.setSettings({
                contentUrl: "https://runarbot.azurewebsites.net/runarbotTabTab.html?data=" + val.value,
                customSettings: val.value,
                suggestedDisplayName: `runarbot`,
                removeUrl: "https://runarbot.azurewebsites.net/remove.html",
            });

            saveEvent.notifySuccess();
        });
    }
    public setValidityState(val: boolean) {
        microsoftTeams.settings.setValidityState(val);
    }
}