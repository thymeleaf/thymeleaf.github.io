/* 
 * Copyright 2015, The Thymeleaf Project (http://www.thymeleaf.org/)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
	'use strict';

	// The following is a copy of the code from https://github.com/ultraq/dumb-query-selector
	var $ = (function() {
		var ID_SELECTOR_REGEX = /^#[a-zA-Z][\w-]*$/;
		return function(query, scope) {
			return ID_SELECTOR_REGEX.test(query) ?
				document.getElementById(query.substring(1)) :
				Array.prototype.slice.call((scope || document).querySelectorAll(query));
		}
	})();


	/**
	 * Swaps HTML characters for their entity codes so that they can be displayed
	 * in `<code>` sections.
	 * 
	 * @param {String} code String to escape.
	 * @return {String} Escaped version of `code`.
	 */
	function escapeHtml(code) {
		return code
			.replace(/&/g, '&amp;')
			.replace(/'/g, '&apos;')
			.replace(/"/g, '&quot;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	var codeSamples = {
		'template-example': [
			'<table>',
			'  <thead>',
			'    <tr>',
			'      <th th:text="#{msgs.headers.name}">Name</th>',
			'      <th th:text="#{msgs.headers.price}">Price</th>',
			'    </tr>',
			'  </thead>',
			'  <tbody>',
			'    <tr th:each="prod: ${allProducts}">',
			'      <td th:text="${prod.name}">Oranges</td>',
			'      <td th:text="${#numbers.formatDecimal(prod.price,1,2)}">0.99</td>',
			'    </tr>',
			'  </tbody>',
			'</table>'
		].join('\n')
	};


	// Match any code samples on the page with those in this file
	$('code[data-src]').forEach(function(codeBlock) {
		var sourceId = codeBlock.dataset.src;
		var codeSample = codeSamples[sourceId];
		if (codeSample) {
			codeBlock.innerHTML = escapeHtml(codeSample);
		}
	});
	

	// Run the Prism syntax highlighter
	Prism.highlightAll();

})();
