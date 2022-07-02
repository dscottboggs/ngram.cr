crystal_doc_search_index_callback({"repository_name":"ngram","body":"# ngram\n\nA Crystal Shard for iterating over arbitrarily-sized and typed N-grams. Given\nany `Iterator(T)`, `Ngram(T, N)` will yield `StaticArray(T, N)` until the\nIterator is exhausted. The first element and any final element(s) of the\nyielded n-grams are `bumper_item T`, which must be defined for any `T`. The\nshard comes with definitions for `Char`, `String`, and any union with `Nil`.\n\nThis is based on my [ngram_iter](https://crates.io/crates/ngram_iter) rust\ncrate, which was in turn loosely inspired by the\n[ngrams](https://crates.io/crates/ngrams) crate.\n\n- [Documentation](https://dscottboggs.github.io/ngram.cr/)\n- [Coverage Report](https://dscottboggs.github.io/ngram.cr/coverage/)\n\n## Installation\n\n1. Add the dependency to your `shard.yml`:\n\n   ```yaml\n   dependencies:\n     ngram:\n       github: dscottboggs/ngram\n   ```\n\n2. Run `shards install`\n\n## Usage\n\n```crystal\nrequire \"ngram\"\n\ncorpus = ('a'..'z').each\nbigrams = Ngram(Char, 2).new corpus\nbigrams.next # => StaticArray['\\u{2060}', 'a']\ntrigrams = Ngram(Char, 3).new corpus\ntrigrams.next # => StaticArray['\\u{2060}', 'a', 'b']\nten_grams = Ngram(Char, 10).new corpus\nten_grams.next # => StaticArray['\\u2060', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']\n\ncorpus = ([1, 2] of Int32?).each\nbigrams = Ngram(Int32?, 2).new corpus\nbigrams.next # => StaticArray[nil, 1]\n```\nSee [the tests](/spec/ngram_spec.cr) for more details on the behavior.\n\nArbitrary types can be used, but must implement `.bumper_char` at the class level. Crystal doesn't really offer a way to document this in the code, but compilation will fail if the method isn't present.\n\n```crystal\nrecord MyType, data : Int32, valid : Bool do\n  def self.invalid\n    new 0, false\n  end\n\n  def initialize(@data : Int32)\n    @valid = true\n  end\n\n  def to_s\n    if valid\n      data.to_s\n    else\n      \"invalid\"\n    end\n  end\n\n  def to_s(io : IO)\n    io.write to_s\n  end\nend\n\ndef bumper_item(_type : MyType.class)\n  MyType.invalid\nend\n\ndata = [MyType.new(1), MyType.new(2)]\nngrams = Ngram(MyType, 2).new data.each\n\nif (ngram = ngrams.next).is_a? Iterator::Stop\n  raise \"unreachable\"\nelse\n  ngram.map(&.to_s).to_a # => [\"invalid\", \"1\"]\nend\n```\n\nThis is a bit of a contrived example, but it demonstrates the flexibility of\nthe shard. Of course, you can always just use a nullable type and the bumepr\nwill be `nil`, but it may make more sense to use, for example,\n`Float64::INFINITY`, or a particular enum variant.\n\n## Contributing\n\n1. Fork it (<https://github.com/dscottboggs/ngram/fork>)\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Add some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create a new Pull Request\n\n## Contributors\n\n- [D. Scott Boggs](https://github.com/dscottboggs) - creator and maintainer\n","program":{"html_id":"ngram/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"locations":[],"repository_name":"ngram","program":true,"enum":false,"alias":false,"const":false,"class_methods":[{"html_id":"bumper_item(_type:::Char.class)-class-method","name":"bumper_item","abstract":false,"args":[{"name":"_type","external_name":"_type","restriction":"::Char.class"}],"args_string":"(_type : ::Char.class)","args_html":"(_type : <span class=\"t\">::</span><span class=\"t\">Char</span>.<span class=\"k\">class</span>)","location":{"filename":"src/bumper.cr","line_number":1,"url":null},"def":{"name":"bumper_item","args":[{"name":"_type","external_name":"_type","restriction":"::Char.class"}],"visibility":"Public","body":"'\\u2060'"}},{"html_id":"bumper_item(_type:::String.class)-class-method","name":"bumper_item","abstract":false,"args":[{"name":"_type","external_name":"_type","restriction":"::String.class"}],"args_string":"(_type : ::String.class)","args_html":"(_type : <span class=\"t\">::</span><span class=\"t\">String</span>.<span class=\"k\">class</span>)","location":{"filename":"src/bumper.cr","line_number":5,"url":null},"def":{"name":"bumper_item","args":[{"name":"_type","external_name":"_type","restriction":"::String.class"}],"visibility":"Public","body":"\"\\u2060\""}},{"html_id":"bumper_item(_type:(T|::Nil).class)forallT-class-method","name":"bumper_item","abstract":false,"args":[{"name":"_type","external_name":"_type","restriction":"(T | ::Nil).class"}],"args_string":"(_type : (T | ::Nil).class) forall T","args_html":"(_type : (<span class=\"t\">T</span> <span class=\"o\">|</span> <span class=\"t\">::</span><span class=\"t\">Nil</span>).<span class=\"k\">class</span>) forall T","location":{"filename":"src/bumper.cr","line_number":9,"url":null},"def":{"name":"bumper_item","args":[{"name":"_type","external_name":"_type","restriction":"(T | ::Nil).class"}],"visibility":"Public","body":"nil"}}],"types":[{"html_id":"ngram/Ngram","path":"Ngram.html","kind":"class","full_name":"Ngram(T, N)","name":"Ngram","abstract":false,"superclass":{"html_id":"ngram/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"ngram/Iterator","kind":"module","full_name":"Iterator","name":"Iterator"},{"html_id":"ngram/Enumerable","kind":"module","full_name":"Enumerable","name":"Enumerable"},{"html_id":"ngram/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"ngram/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/ngram.cr","line_number":3,"url":null}],"repository_name":"ngram","program":false,"enum":false,"alias":false,"const":false,"included_modules":[{"html_id":"ngram/Iterator","kind":"module","full_name":"Iterator","name":"Iterator"}],"constructors":[{"html_id":"new(iter)-class-method","name":"new","abstract":false,"args":[{"name":"iter","external_name":"iter","restriction":""}],"args_string":"(iter)","args_html":"(iter)","location":{"filename":"src/ngram.cr","line_number":9,"url":null},"def":{"name":"new","args":[{"name":"iter","external_name":"iter","restriction":""}],"visibility":"Public","body":"_ = Ngram(T, N).allocate\n_.initialize(iter)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"html_id":"next-instance-method","name":"next","doc":"Returns the next element in this iterator, or `Iterator::Stop::INSTANCE` if there\nare no more elements.","summary":"<p>Returns the next element in this iterator, or <code>Iterator::Stop::INSTANCE</code> if there are no more elements.</p>","abstract":false,"location":{"filename":"src/ngram.cr","line_number":15,"url":null},"def":{"name":"next","visibility":"Public","body":"if @end\n  return Iterator.stop\nend\nresult = uninitialized StaticArray(T, N)\nif overlap = @overlap\n  result[0] = overlap\n  (1...N).each do |i|\n    case value = @iter.next\n    when Iterator::Stop\n      @end = true\n      (i...N).each do |j|\n        result[j] = bumper_item(T)\n      end\n    else\n      result[i] = @overlap = value\n    end\n  end\nelse\n  case value = @iter.next\n  when Iterator::Stop\n    @end = true\n    return Iterator.stop\n  else\n    result[0] = bumper_item(T)\n    result[1] = @overlap = value\n  end\n  (2...N).each do |i|\n    case value = @iter.next\n    when Iterator::Stop\n      @end = true\n      (i...N).each do |j|\n        result[j] = bumper_item(T)\n      end\n    else\n      result[i] = @overlap = value\n    end\n  end\nend\nresult\n"}}]}]}})