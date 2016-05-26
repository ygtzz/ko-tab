;(function() {
    function fKoTab(options) {
        var self = this;
        self.options = options;
        self.oTabItemAdd = new fTabItem(self,0, 1,'&nbsp;+&nbsp;');
        self.aTab = ko.observableArray([self.oTabItemAdd]);
        self.nCurTabIndex = ko.observable(1);
    };
    fKoTab.prototype.fAddTab = function() {
        this.oTabItemAdd.fAddTab();
    }
    fKoTab.prototype.fGetCruuentData = function() {
        return this.aTab()[this.nCurTabIndex() - 1].oData;
    }
    fKoTab.prototype.fGetAllData = function() {
        var aData = this.aTab().map(function(item){
            return item.oData;
        });
        aData.length = aData.length - 1;
        return aData;
    }
    function fTabItem(oTabView,nIndex,nType,sNavText) {
        var self = this;
        self.oTabView = oTabView;
        self.nIndex = ko.observable(nIndex);
        self.nType = ko.observable(nType || 0);
        self.bNavTab = ko.pureComputed(function(){
            return self.nType() === 0;
        });
        self.bCurrent = ko.pureComputed(function() {
            return self.nIndex() === oTabView.nCurTabIndex();
        });
        self.sTabWidth = ko.pureComputed(function(){
            return '80px';
        });
        self.sNavText = ko.observable(sNavText);
        self.oData = {};
    }
    fTabItem.prototype.fTabClick = function() {
        this.oTabView.nCurTabIndex(this.nIndex());
    }
    fTabItem.prototype.fAddTab = function() {
        var self = this.oTabView;
        var nLen = self.aTab().length,
            oTab = new fTabItem(self,nLen);
        if(self.options.fDataHook){
            oTab.oData = self.options.fDataHook(oTab.nIndex());
        }
        if(self.options.fNavTextHook){  
            oTab.sNavText(self.options.fNavTextHook(oTab.nIndex()));
        }
        self.aTab.splice(nLen - 1, 0, oTab);
    }
    fTabItem.prototype.fRemoveTab = function(item) {
        var self = this.oTabView;
        var nIndex = item.nIndex(),
            aTab = self.aTab(),
            nLen = aTab.length;
        if (nLen === 2) {
            return;
        }
        if (nIndex === 1) {
            self.nCurTabIndex(nLen - 2);
        } else if (nIndex <= self.nCurTabIndex()) {
            self.nCurTabIndex(nIndex - 1);
        }
        for (var i = nIndex - 1; i < nLen; i++) {
            var oTab = aTab[i],
                nTIndex = oTab.nIndex() - 1;
            oTab.nIndex(nTIndex);
            if(oTab.nType() !== 1){
                var sNavText = oTab.sNavText();
                oTab.sNavText(sNavText.slice(0,sNavText.length-1) + nTIndex);
            }
        }
        self.aTab.remove(item);
    }

    window["fKoTab"] = fKoTab;
})();
