import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function CampaignFilter() {
    return (
        <div>
            <ToggleGroup type='multiple'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div>
                                <ToggleGroupItem
                                    value='Active'
                                >
                                    Active
                                </ToggleGroupItem>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>Show only active campaigns</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div>
                                <ToggleGroupItem
                                    value='Inactive'
                                >
                                    Inactive
                                </ToggleGroupItem>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>Show only inactive campaigns</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </ToggleGroup>
        </div>
    )
}