require "./spec_helper"

describe NGrams do
  describe "bi-grams" do
    context "when T is Char" do
      it "immediately stops from empty iter" do
        NGrams(Char, 2).new(([] of Char).each).next.should eq Iterator.stop
      end

      it "yields the correct values for a 1-char array" do
        subj = NGrams(Char, 2).new ['1'].each
        subj.next.should eq StaticArray[bumper_item(Char), '1']
        subj.next.should eq StaticArray['1', bumper_item(Char)]
        subj.next.should eq Iterator.stop
      end

      it "yields the correct values for a 2-char array" do
        subj = NGrams(Char, 2).new ['1', '2'].each
        subj.next.should eq StaticArray[bumper_item(Char), '1']
        subj.next.should eq StaticArray['1', '2']
        subj.next.should eq StaticArray['2', bumper_item(Char)]
        subj.next.should eq Iterator.stop
      end
    end
    context "when T is String" do
      it "immediately stops from empty iter" do
        NGrams(String, 2).new(([] of String).each).next.should eq Iterator.stop
      end

      it "yields the correct values for a 1-char array" do
        subj = NGrams(String, 2).new ["1"].each
        subj.next.should eq StaticArray[bumper_item(String), "1"]
        subj.next.should eq StaticArray["1", bumper_item(String)]
        subj.next.should eq Iterator.stop
      end

      it "yields the correct values for a 2-char array" do
        subj = NGrams(String, 2).new ["1", "2"].each
        subj.next.should eq StaticArray[bumper_item(String), "1"]
        subj.next.should eq StaticArray["1", "2"]
        subj.next.should eq StaticArray["2", bumper_item(String)]
        subj.next.should eq Iterator.stop
      end
    end
    context "when T is Int32?" do
      it "yields the values with nil bumpers" do
        corpus = ([1, 2] of Int32?).each
        bigrams = NGrams(Int32?, 2).new corpus
        bigrams.next.should eq StaticArray[nil, 1]
      end
    end
  end
  describe "tri-grams" do
    context "when T is Char" do
      it "immediately stops from empty iter" do
        NGrams(Char, 3).new(([] of Char).each).next.should eq Iterator.stop
      end

      it "yields the correct values for a 1-char array" do
        subj = NGrams(Char, 3).new ['1'].each
        subj.next.should eq StaticArray[bumper_item(Char), '1', bumper_item(Char)]
        subj.next.should eq Iterator.stop
      end

      it "yields the correct values for a 2-char array" do
        subj = NGrams(Char, 3).new ['1', '2'].each
        subj.next.should eq StaticArray[bumper_item(Char), '1', '2']
        subj.next.should eq StaticArray['2', bumper_item(Char), bumper_item(Char)]
        subj.next.should eq Iterator.stop
      end
      it "yields the correct values for a 3-char array" do
        subj = NGrams(Char, 3).new ['1', '2', '3'].each
        subj.next.should eq StaticArray[bumper_item(Char), '1', '2']
        subj.next.should eq StaticArray['2', '3', bumper_item(Char)]
        subj.next.should eq Iterator.stop
      end
    end

    context "when T is String" do
      it "immediately stops from empty iter" do
        NGrams(String, 3).new(([] of String).each).next.should eq Iterator.stop
      end

      it "yields the correct values for a 1-char array" do
        subj = NGrams(String, 3).new ["1"].each
        subj.next.should eq StaticArray[bumper_item(String), "1", bumper_item(String)]
        subj.next.should eq Iterator.stop
      end

      it "yields the correct values for a 2-char array" do
        subj = NGrams(String, 3).new ["1", "2"].each
        subj.next.should eq StaticArray[bumper_item(String), "1", "2"]
        subj.next.should eq StaticArray["2", bumper_item(String), bumper_item(String)]
        subj.next.should eq Iterator.stop
      end
      it "yields the correct values for a 3-char array" do
        subj = NGrams(String, 3).new ["1", "2", "3"].each
        subj.next.should eq StaticArray[bumper_item(String), "1", "2"]
        subj.next.should eq StaticArray["2", "3", bumper_item(String)]
        subj.next.should eq Iterator.stop
      end
    end
  end

  describe "10-grams" do
    context "when T is Char" do
      subj = NGrams(Char, 10).new ('a'..'z').each
      subj.next.should eq StaticArray['\u2060', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
      subj.next.should eq StaticArray['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r']
      subj.next.should eq StaticArray['r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '\u2060']
      subj.next.should eq Iterator.stop
    end
  end

  # uncomment to test compile failure
  # it "should fail to compile when N <= 2" do
  #   NGrams(Char, 1).new ['1'].each
  # end
end

describe "bumper" do
  bumper_item(::Char).should eq '\u{2060}'
  bumper_item(::String).should eq "\u{2060}"
  bumper_item(::Int32?).should eq nil
end
