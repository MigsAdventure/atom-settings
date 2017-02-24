'use babel';

import DotfilesView from './dotfiles-view';
import { CompositeDisposable } from 'atom';

export default {

  dotfilesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.dotfilesView = new DotfilesView(state.dotfilesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.dotfilesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'dotfiles:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.dotfilesView.destroy();
  },

  serialize() {
    return {
      dotfilesViewState: this.dotfilesView.serialize()
    };
  },

  toggle() {
    console.log('Dotfiles was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
