/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module image/imagealternatetext/ui/imagealternatetextformview
 */

import View from '@ckeditor/ckeditor5-ui/src/view';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Template from '@ckeditor/ckeditor5-ui/src/template';
import LabeledInputView from '@ckeditor/ckeditor5-ui/src/labeledinput/labeledinputview';
import TextAreaView from './textareaview';
import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';

/**
 * AlternateTextFormView class.
 *
 * @extends module:ui/view~View
 */
export default class AlternateTextFormView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		/**
		 * Text area with label.
		 *
		 * @member {module:ui/labeledinput/labeledinputview~LabeledInputView} #labeledTextarea
		 */
		this.labeledTextarea = this._createLabeledTextarea();

		/**
		 * Button used to submit the form.
		 *
		 * @member {module:ui/button/buttonview~ButtonView} #saveButtonView
		 */
		this.saveButtonView = this._createButton( 'Ok' );
		this.saveButtonView.type = 'submit';

		/**
		 * Button used to cancel the form.
		 *
		 * @member {module:ui/button/buttonview~ButtonView} #cancelButtonView
		 */
		this.cancelButtonView = this._createButton( 'Cancel', 'cancel' );

		// Register child views.
		this.addChildren( [ this.saveButtonView ] );

		Template.extend( this.saveButtonView.template, {
			attributes: {
				class: [
					'ck-button-action'
				]
			}
		} );

		this.template = new Template( {
			tag: 'form',

			attributes: {
				class: [
					'ck-alternate-text-form',
				]
			},

			children: [
				this.labeledTextarea,
				{
					tag: 'div',

					attributes: {
						class: [
							'ck-alternate-text-form__actions'
						]
					},

					children: [
						this.saveButtonView,
						this.cancelButtonView
					]
				}
			]
		} );

		submitHandler( {
			view: this
		} );
	}

	/**
	 * Creates button View.
	 *
	 * @private
	 * @param {String} label Button label
	 * @param {String} [eventName] Event name which ButtonView#execute event will be delegated to.
	 * @returns {module:ui/button/buttonview~ButtonView} Button view instance.
	 */
	_createButton( label, eventName ) {
		const t = this.locale.t;
		const button = new ButtonView( this.locale );

		button.label = t( label );
		button.withText = true;

		if ( eventName ) {
			button.delegate( 'execute' ).to( this, eventName );
		}

		return button;
	}

	/**
	 * Creates textarea with label.
	 *
	 * @private
	 * @return {module:ui/labeledinput/labeledinputview~LabeledInputView}
	 */
	_createLabeledTextarea() {
		const t = this.locale.t;
		const labeledInput = new LabeledInputView( this.locale, TextAreaView );
		labeledInput.label = t( 'Alternate image text' );

		return labeledInput;
	}
}
